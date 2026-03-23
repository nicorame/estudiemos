import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface Props { userId: string; }
type Phase = 'work' | 'break';

const DEFAULT_WORK = 25;
const DEFAULT_BREAK = 5;

interface RoomMember { user_id: string; username: string; }

export function PomodoroSection({ userId }: Props) {
  const [workMin, setWorkMin] = useState(DEFAULT_WORK);
  const [breakMin, setBreakMin] = useState(DEFAULT_BREAK);
  const [phase, setPhase] = useState<Phase>('work');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [saving, setSaving] = useState(false);
  const [phaseEnded, setPhaseEnded] = useState<Phase | null>(null);

  // Room state
  const [roomId, setRoomId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [members, setMembers] = useState<RoomMember[]>([]);
  const [joinCode, setJoinCode] = useState('');
  const [joinError, setJoinError] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);

  // Refs to avoid stale closures in callbacks/intervals
  const startedAtRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isOwnerRef = useRef(false);
  const workMinRef = useRef(DEFAULT_WORK);
  const breakMinRef = useRef(DEFAULT_BREAK);
  const phaseRef = useRef<Phase>('work');
  const usernameRef = useRef('');

  useEffect(() => {
    supabase.from('profiles').select('username').eq('id', userId).single()
      .then(({ data }) => {
        const u = data?.username ?? '';
        usernameRef.current = u;
        if (channelRef.current) {
          channelRef.current.track({ user_id: userId, username: u });
        }
      });

    // Auto-detectar ?join=CODIGO en la URL
    const params = new URLSearchParams(window.location.search);
    const joinParam = params.get('join');
    if (joinParam) {
      setJoinCode(joinParam.toUpperCase());
      setShowJoinInput(true);
      window.history.replaceState({}, '', window.location.pathname);
    }

    return () => {
      channelRef.current?.unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Keep refs in sync with state
  useEffect(() => { workMinRef.current = workMin; }, [workMin]);
  useEffect(() => { breakMinRef.current = breakMin; }, [breakMin]);
  useEffect(() => { isOwnerRef.current = isOwner; }, [isOwner]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Handle phase end via state flag (avoids calling setState inside setInterval updater)
  useEffect(() => {
    if (!phaseEnded) return;
    const endedPhase = phaseEnded;
    setPhaseEnded(null);

    if (endedPhase === 'work') {
      setSaving(true);
      supabase.from('pomodoro_sessions').insert({
        user_id: userId,
        duration_minutes: workMinRef.current,
        completed: true,
        started_at: startedAtRef.current ?? new Date().toISOString(),
        ended_at: new Date().toISOString(),
      }).then(() => setSaving(false));
      startedAtRef.current = null;
      setCyclesCompleted(c => c + 1);
      setPhase('break');
      phaseRef.current = 'break';
      setTimeLeft(breakMinRef.current * 60);
    } else {
      setPhase('work');
      phaseRef.current = 'work';
      setTimeLeft(workMinRef.current * 60);
    }
  }, [phaseEnded]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id);
          setIsRunning(false);
          setPhaseEnded(phaseRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [isRunning]);

  // Sync timeLeft when settings change (only when stopped)
  useEffect(() => {
    if (!isRunning) setTimeLeft(phase === 'work' ? workMin * 60 : breakMin * 60);
  }, [workMin, breakMin]);

  function broadcast(action: string) {
    channelRef.current?.send({ type: 'broadcast', event: 'timer', payload: { action } });
  }

  function handleStart() {
    if (phase === 'work' && !startedAtRef.current) startedAtRef.current = new Date().toISOString();
    setIsRunning(true);
    if (isOwner) broadcast('start');
  }

  function handlePause() {
    setIsRunning(false);
    if (isOwner) broadcast('pause');
  }

  function handleReset() {
    setIsRunning(false);
    startedAtRef.current = null;
    setPhase('work');
    phaseRef.current = 'work';
    setTimeLeft(workMinRef.current * 60);
    if (isOwner) broadcast('reset');
  }

  function handleSkip() {
    setIsRunning(false);
    startedAtRef.current = null;
    if (phaseRef.current === 'work') {
      setPhase('break');
      phaseRef.current = 'break';
      setTimeLeft(breakMinRef.current * 60);
      if (isOwner) broadcast('skip_break');
    } else {
      setPhase('work');
      phaseRef.current = 'work';
      setTimeLeft(workMinRef.current * 60);
      if (isOwner) broadcast('skip_work');
    }
  }

  // Called for guests receiving owner's broadcast events
  function handleRemoteAction(payload: { action: string }) {
    switch (payload.action) {
      case 'start':
        if (!startedAtRef.current) startedAtRef.current = new Date().toISOString();
        setIsRunning(true);
        break;
      case 'pause':
        setIsRunning(false);
        break;
      case 'reset':
        setIsRunning(false);
        startedAtRef.current = null;
        setPhase('work');
        phaseRef.current = 'work';
        setTimeLeft(workMinRef.current * 60);
        break;
      case 'skip_break':
        setIsRunning(false);
        startedAtRef.current = null;
        setPhase('break');
        phaseRef.current = 'break';
        setTimeLeft(breakMinRef.current * 60);
        break;
      case 'skip_work':
        setIsRunning(false);
        startedAtRef.current = null;
        setPhase('work');
        phaseRef.current = 'work';
        setTimeLeft(workMinRef.current * 60);
        break;
    }
  }

  async function createRoom() {
    setCreatingRoom(true);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase.from('pomodoro_rooms').insert({
      owner_id: userId,
      invite_code: code,
      status: 'waiting',
      duration_minutes: workMin,
      break_minutes: breakMin,
    }).select().single();

    if (error || !data) { setCreatingRoom(false); return; }

    await supabase.from('pomodoro_room_members').insert({ room_id: data.id, user_id: userId });

    setRoomId(data.id);
    setInviteCode(data.invite_code);
    setIsOwner(true);
    isOwnerRef.current = true;
    subscribeToRoom(data.id);
    setCreatingRoom(false);
  }

  async function joinRoom() {
    setJoinError('');
    setJoiningRoom(true);

    const { data: room, error } = await supabase.from('pomodoro_rooms')
      .select('*')
      .eq('invite_code', joinCode.toUpperCase().trim())
      .single();

    if (error || !room) {
      setJoinError('Código no encontrado');
      setJoiningRoom(false);
      return;
    }

    const { error: memberError } = await supabase.from('pomodoro_room_members')
      .insert({ room_id: room.id, user_id: userId });

    if (memberError && memberError.code !== '23505') {
      setJoinError('No se pudo unir');
      setJoiningRoom(false);
      return;
    }

    setRoomId(room.id);
    setInviteCode(room.invite_code);
    setIsOwner(false);
    isOwnerRef.current = false;
    setWorkMin(room.duration_minutes);
    setBreakMin(room.break_minutes);
    workMinRef.current = room.duration_minutes;
    breakMinRef.current = room.break_minutes;
    setTimeLeft(room.duration_minutes * 60);
    setShowJoinInput(false);
    subscribeToRoom(room.id);
    setJoiningRoom(false);
  }

  function subscribeToRoom(rId: string) {
    if (channelRef.current) channelRef.current.unsubscribe();
    const ch = supabase.channel(`pomo-room:${rId}`);

    ch.on('presence', { event: 'sync' }, () => {
      const state = ch.presenceState<{ user_id: string; username: string }>();
      setMembers(Object.values(state).flat());
    });

    ch.on('broadcast', { event: 'timer' }, ({ payload }) => {
      if (!isOwnerRef.current) handleRemoteAction(payload);
    });

    ch.subscribe(async status => {
      if (status === 'SUBSCRIBED') {
        await ch.track({ user_id: userId, username: usernameRef.current || userId.slice(0, 8) });
      }
    });

    channelRef.current = ch;
  }

  async function leaveRoom() {
    channelRef.current?.unsubscribe();
    channelRef.current = null;
    if (roomId) {
      if (isOwner) {
        await supabase.from('pomodoro_rooms').update({ status: 'finished' }).eq('id', roomId);
      }
      await supabase.from('pomodoro_room_members').delete()
        .eq('room_id', roomId).eq('user_id', userId);
    }
    setRoomId(null);
    setInviteCode(null);
    setIsOwner(false);
    isOwnerRef.current = false;
    setMembers([]);
    handleReset();
  }

  async function shareRoom() {
    if (!inviteCode) return;
    const url = `${window.location.origin}/dashboard?join=${inviteCode}`;
    const text = `¡Estudiemos juntos! Abrí este enlace y unite a mi sesión de pomodoro en estudiemos.ar:\n${url}`;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // fallback a clipboard
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const total = phase === 'work' ? workMin * 60 : breakMin * 60;
  const progress = total > 0 ? (total - timeLeft) / total : 0;
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const canControl = !roomId || isOwner;

  return (
    <div className="section-content">
      <div className="home-header">
        <h1 className="home-title">Pomodoro</h1>
        <p className="home-subtitle">
          {cyclesCompleted} sesión{cyclesCompleted !== 1 ? 'es' : ''} completada{cyclesCompleted !== 1 ? 's' : ''} hoy
        </p>
      </div>

      <div className="pomo-wrapper">
        {/* Phase tabs */}
        <div className="pomo-phase-tabs">
          <button
            className={`pomo-phase-tab${phase === 'work' ? ' active' : ''}`}
            onClick={() => {
              if (canControl && !isRunning) {
                setPhase('work'); phaseRef.current = 'work';
                setTimeLeft(workMin * 60); startedAtRef.current = null;
              }
            }}
          >Trabajo</button>
          <button
            className={`pomo-phase-tab${phase === 'break' ? ' active' : ''}`}
            onClick={() => {
              if (canControl && !isRunning) {
                setPhase('break'); phaseRef.current = 'break';
                setTimeLeft(breakMin * 60); startedAtRef.current = null;
              }
            }}
          >Descanso</button>
        </div>

        {/* Circular timer */}
        <div className="pomo-circle-container">
          <svg className="pomo-svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="100" cy="100" r={radius} fill="none"
              stroke={phase === 'work' ? '#6366f1' : '#10b981'} strokeWidth="6"
              strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 100 100)"
              style={{ transition: isRunning ? 'stroke-dashoffset 1s linear' : 'none' }}
            />
          </svg>
          <div className="pomo-time-display">
            <span className="pomo-time">{minutes}:{seconds}</span>
            <span className="pomo-phase-label">{phase === 'work' ? 'Focus' : 'Descansando'}</span>
            {saving && <span className="pomo-saving">Guardando...</span>}
          </div>
        </div>

        {/* Controls */}
        <div className="pomo-controls">
          {!isRunning ? (
            <button className="pomo-btn pomo-btn-primary" onClick={handleStart} disabled={!canControl}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              {timeLeft === (phase === 'work' ? workMin : breakMin) * 60 ? 'Iniciar' : 'Continuar'}
            </button>
          ) : (
            <button className="pomo-btn pomo-btn-primary" onClick={handlePause} disabled={!canControl}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              Pausar
            </button>
          )}
          <button className="pomo-btn pomo-btn-secondary" onClick={handleSkip} disabled={!canControl} title="Saltar fase">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
          <button className="pomo-btn pomo-btn-secondary" onClick={handleReset} disabled={!canControl} title="Reiniciar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.45"/></svg>
          </button>
          <button className="pomo-btn pomo-btn-secondary" onClick={() => setShowSettings(s => !s)} title="Configuración">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>

        {!canControl && (
          <p className="pomo-guest-notice">Solo el dueño de la sala puede controlar el timer</p>
        )}

        {/* Settings panel */}
        {showSettings && (
          <div className="pomo-settings">
            <div className="pomo-setting-row">
              <label className="pomo-setting-label">Trabajo (min)</label>
              <div className="pomo-setting-controls">
                <button className="pomo-setting-btn" onClick={() => setWorkMin(m => Math.max(1, m - 5))}>−</button>
                <span className="pomo-setting-value">{workMin}</span>
                <button className="pomo-setting-btn" onClick={() => setWorkMin(m => Math.min(90, m + 5))}>+</button>
              </div>
            </div>
            <div className="pomo-setting-row">
              <label className="pomo-setting-label">Descanso (min)</label>
              <div className="pomo-setting-controls">
                <button className="pomo-setting-btn" onClick={() => setBreakMin(m => Math.max(1, m - 1))}>−</button>
                <span className="pomo-setting-value">{breakMin}</span>
                <button className="pomo-setting-btn" onClick={() => setBreakMin(m => Math.min(30, m + 1))}>+</button>
              </div>
            </div>
          </div>
        )}

        {/* Room panel */}
        <div className="pomo-room-section">
          {!roomId ? (
            <>
              <div className="pomo-room-actions">
                <button className="pomo-room-btn" onClick={createRoom} disabled={creatingRoom}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  {creatingRoom ? 'Creando...' : 'Crear sala'}
                </button>
                <button
                  className="pomo-room-btn pomo-room-btn-ghost"
                  onClick={() => { setShowJoinInput(j => !j); setJoinError(''); }}
                >
                  Unirse con código
                </button>
              </div>

              {showJoinInput && (
                <div className="pomo-join-form">
                  <input
                    className="pomo-join-input"
                    type="text"
                    placeholder="ABC123"
                    value={joinCode}
                    onChange={e => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    onKeyDown={e => e.key === 'Enter' && joinCode.length === 6 && joinRoom()}
                  />
                  <button
                    className="pomo-room-btn"
                    onClick={joinRoom}
                    disabled={joiningRoom || joinCode.length < 6}
                  >
                    {joiningRoom ? '...' : 'Unirse'}
                  </button>
                  {joinError && <p className="pomo-join-error">{joinError}</p>}
                </div>
              )}
            </>
          ) : (
            <div className="pomo-room-card">
              <div className="pomo-room-header">
                <div>
                  <span className="pomo-room-label">{isOwner ? 'Tu sala' : 'Sala colaborativa'}</span>
                  {inviteCode && <span className="pomo-room-code">{inviteCode}</span>}
                </div>
                <div className="pomo-room-header-actions">
                  {isOwner && (
                    <button className="pomo-share-btn" onClick={shareRoom}>
                      {copied
                        ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg> ¡Copiado!</>
                        : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Compartir</>
                      }
                    </button>
                  )}
                  <button className="pomo-leave-btn" onClick={leaveRoom}>Salir</button>
                </div>
              </div>

              {members.length > 0 && (
                <div className="pomo-members">
                  {members.map(m => (
                    <div key={m.user_id} className="pomo-member-chip">
                      <span className="pomo-member-dot" />
                      {m.username || m.user_id.slice(0, 8)}
                      {m.user_id === userId && <span className="pomo-member-you"> (vos)</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Completed cycles */}
      {cyclesCompleted > 0 && (
        <div className="pomo-cycles">
          {Array.from({ length: cyclesCompleted }).map((_, i) => (
            <div key={i} className="pomo-cycle-dot" title={`Sesión ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}

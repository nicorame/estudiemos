import { e as createComponent, l as renderHead, n as renderSlot, r as renderTemplate, h as createAstro, k as renderComponent } from '../chunks/astro/server_y1XpGNYX.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                     */
/* empty css                                     */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useRef } from 'react';
import { s as supabase } from '../chunks/supabase_DZm20HW4.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$DashboardLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-kqx5um5x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title} | Estudiemos</title>${renderHead()}</head> <body data-astro-cid-kqx5um5x> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/nicolasrame/Documents/Workspace/estudiemos/src/layouts/DashboardLayout.astro", void 0);

function TodoSection({ userId }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    fetchTodos();
  }, []);
  async function fetchTodos() {
    const { data } = await supabase.from("todos").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    setTodos(data ?? []);
    setLoading(false);
  }
  async function addTodo(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setAdding(true);
    const { data, error } = await supabase.from("todos").insert({ user_id: userId, title: input.trim(), due_date: dueDate || null }).select().single();
    if (!error && data) {
      setTodos((prev) => [data, ...prev]);
      setInput("");
      setDueDate("");
    }
    setAdding(false);
  }
  async function toggleTodo(id, completed) {
    await supabase.from("todos").update({ completed: !completed }).eq("id", id);
    setTodos((prev) => prev.map((t) => t.id === id ? { ...t, completed: !completed } : t));
  }
  async function deleteTodo(id) {
    await supabase.from("todos").delete().eq("id", id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }
  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);
  return /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
    /* @__PURE__ */ jsxs("div", { className: "home-header", children: [
      /* @__PURE__ */ jsx("h1", { className: "home-title", children: "Tareas" }),
      /* @__PURE__ */ jsxs("p", { className: "home-subtitle", children: [
        pending.length,
        " pendiente",
        pending.length !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "todo-form", onSubmit: addTodo, children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "todo-input",
          type: "text",
          placeholder: "Nueva tarea...",
          value: input,
          onChange: (e) => setInput(e.target.value),
          disabled: adding
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          className: "todo-date",
          type: "date",
          value: dueDate,
          onChange: (e) => setDueDate(e.target.value),
          disabled: adding
        }
      ),
      /* @__PURE__ */ jsx("button", { className: "todo-add-btn", type: "submit", disabled: adding || !input.trim(), children: adding ? "..." : "+ Agregar" })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "todo-loading", children: "Cargando..." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      pending.length === 0 && done.length === 0 && /* @__PURE__ */ jsxs("div", { className: "todo-empty", children: [
        /* @__PURE__ */ jsx("span", { children: "📋" }),
        /* @__PURE__ */ jsx("p", { children: "No tenés tareas todavía. ¡Agregá una!" })
      ] }),
      pending.length > 0 && /* @__PURE__ */ jsx("div", { className: "todo-list", children: pending.map((todo) => /* @__PURE__ */ jsx(TodoItem, { todo, onToggle: toggleTodo, onDelete: deleteTodo }, todo.id)) }),
      done.length > 0 && /* @__PURE__ */ jsxs("div", { className: "todo-done-section", children: [
        /* @__PURE__ */ jsxs("p", { className: "todo-done-label", children: [
          "Completadas (",
          done.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "todo-list", children: done.map((todo) => /* @__PURE__ */ jsx(TodoItem, { todo, onToggle: toggleTodo, onDelete: deleteTodo }, todo.id)) })
      ] })
    ] })
  ] });
}
function TodoItem({
  todo,
  onToggle,
  onDelete
}) {
  const isOverdue = todo.due_date && !todo.completed && todo.due_date < (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return /* @__PURE__ */ jsxs("div", { className: `todo-item${todo.completed ? " completed" : ""}`, children: [
    /* @__PURE__ */ jsx("button", { className: "todo-check", onClick: () => onToggle(todo.id, todo.completed), children: todo.completed ? /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#6366f1", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) : /* @__PURE__ */ jsx("span", { className: "todo-check-empty" }) }),
    /* @__PURE__ */ jsxs("div", { className: "todo-text", children: [
      /* @__PURE__ */ jsx("span", { className: "todo-title", children: todo.title }),
      todo.due_date && /* @__PURE__ */ jsxs("span", { className: `todo-due${isOverdue ? " overdue" : ""}`, children: [
        "📅 ",
        formatDate(todo.due_date)
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "todo-delete", onClick: () => onDelete(todo.id), children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
      /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
    ] }) })
  ] });
}
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("es-AR", { day: "numeric", month: "short" });
}

const DEFAULT_WORK = 25;
const DEFAULT_BREAK = 5;
function PomodoroSection({ userId }) {
  const [workMin, setWorkMin] = useState(DEFAULT_WORK);
  const [breakMin, setBreakMin] = useState(DEFAULT_BREAK);
  const [phase, setPhase] = useState("work");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [saving, setSaving] = useState(false);
  const [phaseEnded, setPhaseEnded] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [inviteCode, setInviteCode] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [members, setMembers] = useState([]);
  const [joinCode, setJoinCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [joiningRoom, setJoiningRoom] = useState(false);
  const startedAtRef = useRef(null);
  const intervalRef = useRef(null);
  const channelRef = useRef(null);
  const isOwnerRef = useRef(false);
  const workMinRef = useRef(DEFAULT_WORK);
  const breakMinRef = useRef(DEFAULT_BREAK);
  const phaseRef = useRef("work");
  const usernameRef = useRef("");
  useEffect(() => {
    supabase.from("profiles").select("username").eq("id", userId).single().then(({ data }) => {
      const u = data?.username ?? "";
      usernameRef.current = u;
      if (channelRef.current) {
        channelRef.current.track({ user_id: userId, username: u });
      }
    });
    const params = new URLSearchParams(window.location.search);
    const joinParam = params.get("join");
    if (joinParam) {
      setJoinCode(joinParam.toUpperCase());
      setShowJoinInput(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
    return () => {
      channelRef.current?.unsubscribe();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  useEffect(() => {
    workMinRef.current = workMin;
  }, [workMin]);
  useEffect(() => {
    breakMinRef.current = breakMin;
  }, [breakMin]);
  useEffect(() => {
    isOwnerRef.current = isOwner;
  }, [isOwner]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);
  useEffect(() => {
    if (!phaseEnded) return;
    const endedPhase = phaseEnded;
    setPhaseEnded(null);
    if (endedPhase === "work") {
      setSaving(true);
      supabase.from("pomodoro_sessions").insert({
        user_id: userId,
        duration_minutes: workMinRef.current,
        completed: true,
        started_at: startedAtRef.current ?? (/* @__PURE__ */ new Date()).toISOString(),
        ended_at: (/* @__PURE__ */ new Date()).toISOString()
      }).then(() => setSaving(false));
      startedAtRef.current = null;
      setCyclesCompleted((c) => c + 1);
      setPhase("break");
      phaseRef.current = "break";
      setTimeLeft(breakMinRef.current * 60);
    } else {
      setPhase("work");
      phaseRef.current = "work";
      setTimeLeft(workMinRef.current * 60);
    }
  }, [phaseEnded]);
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          setIsRunning(false);
          setPhaseEnded(phaseRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1e3);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [isRunning]);
  useEffect(() => {
    if (!isRunning) setTimeLeft(phase === "work" ? workMin * 60 : breakMin * 60);
  }, [workMin, breakMin]);
  function broadcast(action) {
    channelRef.current?.send({ type: "broadcast", event: "timer", payload: { action } });
  }
  function handleStart() {
    if (phase === "work" && !startedAtRef.current) startedAtRef.current = (/* @__PURE__ */ new Date()).toISOString();
    setIsRunning(true);
    if (isOwner) broadcast("start");
  }
  function handlePause() {
    setIsRunning(false);
    if (isOwner) broadcast("pause");
  }
  function handleReset() {
    setIsRunning(false);
    startedAtRef.current = null;
    setPhase("work");
    phaseRef.current = "work";
    setTimeLeft(workMinRef.current * 60);
    if (isOwner) broadcast("reset");
  }
  function handleSkip() {
    setIsRunning(false);
    startedAtRef.current = null;
    if (phaseRef.current === "work") {
      setPhase("break");
      phaseRef.current = "break";
      setTimeLeft(breakMinRef.current * 60);
      if (isOwner) broadcast("skip_break");
    } else {
      setPhase("work");
      phaseRef.current = "work";
      setTimeLeft(workMinRef.current * 60);
      if (isOwner) broadcast("skip_work");
    }
  }
  function handleRemoteAction(payload) {
    switch (payload.action) {
      case "start":
        if (!startedAtRef.current) startedAtRef.current = (/* @__PURE__ */ new Date()).toISOString();
        setIsRunning(true);
        break;
      case "pause":
        setIsRunning(false);
        break;
      case "reset":
        setIsRunning(false);
        startedAtRef.current = null;
        setPhase("work");
        phaseRef.current = "work";
        setTimeLeft(workMinRef.current * 60);
        break;
      case "skip_break":
        setIsRunning(false);
        startedAtRef.current = null;
        setPhase("break");
        phaseRef.current = "break";
        setTimeLeft(breakMinRef.current * 60);
        break;
      case "skip_work":
        setIsRunning(false);
        startedAtRef.current = null;
        setPhase("work");
        phaseRef.current = "work";
        setTimeLeft(workMinRef.current * 60);
        break;
    }
  }
  async function createRoom() {
    setCreatingRoom(true);
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await supabase.from("pomodoro_rooms").insert({
      owner_id: userId,
      invite_code: code,
      status: "waiting",
      duration_minutes: workMin,
      break_minutes: breakMin
    }).select().single();
    if (error || !data) {
      setCreatingRoom(false);
      return;
    }
    await supabase.from("pomodoro_room_members").insert({ room_id: data.id, user_id: userId });
    setRoomId(data.id);
    setInviteCode(data.invite_code);
    setIsOwner(true);
    isOwnerRef.current = true;
    subscribeToRoom(data.id);
    setCreatingRoom(false);
  }
  async function joinRoom() {
    setJoinError("");
    setJoiningRoom(true);
    const { data: room, error } = await supabase.from("pomodoro_rooms").select("*").eq("invite_code", joinCode.toUpperCase().trim()).single();
    if (error || !room) {
      setJoinError("Código no encontrado");
      setJoiningRoom(false);
      return;
    }
    const { error: memberError } = await supabase.from("pomodoro_room_members").insert({ room_id: room.id, user_id: userId });
    if (memberError && memberError.code !== "23505") {
      setJoinError("No se pudo unir");
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
  function subscribeToRoom(rId) {
    if (channelRef.current) channelRef.current.unsubscribe();
    const ch = supabase.channel(`pomo-room:${rId}`);
    ch.on("presence", { event: "sync" }, () => {
      const state = ch.presenceState();
      setMembers(Object.values(state).flat());
    });
    ch.on("broadcast", { event: "timer" }, ({ payload }) => {
      if (!isOwnerRef.current) handleRemoteAction(payload);
    });
    ch.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
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
        await supabase.from("pomodoro_rooms").update({ status: "finished" }).eq("id", roomId);
      }
      await supabase.from("pomodoro_room_members").delete().eq("room_id", roomId).eq("user_id", userId);
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
    const text = `¡Estudiemos juntos! Abrí este enlace y unite a mi sesión de pomodoro en estudiemos.ar:
${url}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        return;
      } catch {
      }
    }
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }
  const total = phase === "work" ? workMin * 60 : breakMin * 60;
  const progress = total > 0 ? (total - timeLeft) / total : 0;
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const canControl = !roomId || isOwner;
  return /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
    /* @__PURE__ */ jsxs("div", { className: "home-header", children: [
      /* @__PURE__ */ jsx("h1", { className: "home-title", children: "Pomodoro" }),
      /* @__PURE__ */ jsxs("p", { className: "home-subtitle", children: [
        cyclesCompleted,
        " sesión",
        cyclesCompleted !== 1 ? "es" : "",
        " completada",
        cyclesCompleted !== 1 ? "s" : "",
        " hoy"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "pomo-wrapper", children: [
      /* @__PURE__ */ jsxs("div", { className: "pomo-phase-tabs", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `pomo-phase-tab${phase === "work" ? " active" : ""}`,
            onClick: () => {
              if (canControl && !isRunning) {
                setPhase("work");
                phaseRef.current = "work";
                setTimeLeft(workMin * 60);
                startedAtRef.current = null;
              }
            },
            children: "Trabajo"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: `pomo-phase-tab${phase === "break" ? " active" : ""}`,
            onClick: () => {
              if (canControl && !isRunning) {
                setPhase("break");
                phaseRef.current = "break";
                setTimeLeft(breakMin * 60);
                startedAtRef.current = null;
              }
            },
            children: "Descanso"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pomo-circle-container", children: [
        /* @__PURE__ */ jsxs("svg", { className: "pomo-svg", viewBox: "0 0 200 200", children: [
          /* @__PURE__ */ jsx("circle", { cx: "100", cy: "100", r: radius, fill: "none", stroke: "rgba(255,255,255,0.06)", strokeWidth: "6" }),
          /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "100",
              cy: "100",
              r: radius,
              fill: "none",
              stroke: phase === "work" ? "#6366f1" : "#10b981",
              strokeWidth: "6",
              strokeLinecap: "round",
              strokeDasharray: circumference,
              strokeDashoffset,
              transform: "rotate(-90 100 100)",
              style: { transition: isRunning ? "stroke-dashoffset 1s linear" : "none" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pomo-time-display", children: [
          /* @__PURE__ */ jsxs("span", { className: "pomo-time", children: [
            minutes,
            ":",
            seconds
          ] }),
          /* @__PURE__ */ jsx("span", { className: "pomo-phase-label", children: phase === "work" ? "Focus" : "Descansando" }),
          saving && /* @__PURE__ */ jsx("span", { className: "pomo-saving", children: "Guardando..." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "pomo-controls", children: [
        !isRunning ? /* @__PURE__ */ jsxs("button", { className: "pomo-btn pomo-btn-primary", onClick: handleStart, disabled: !canControl, children: [
          /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx("polygon", { points: "5 3 19 12 5 21 5 3" }) }),
          timeLeft === (phase === "work" ? workMin : breakMin) * 60 ? "Iniciar" : "Continuar"
        ] }) : /* @__PURE__ */ jsxs("button", { className: "pomo-btn pomo-btn-primary", onClick: handlePause, disabled: !canControl, children: [
          /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: [
            /* @__PURE__ */ jsx("rect", { x: "6", y: "4", width: "4", height: "16" }),
            /* @__PURE__ */ jsx("rect", { x: "14", y: "4", width: "4", height: "16" })
          ] }),
          "Pausar"
        ] }),
        /* @__PURE__ */ jsx("button", { className: "pomo-btn pomo-btn-secondary", onClick: handleSkip, disabled: !canControl, title: "Saltar fase", children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: [
          /* @__PURE__ */ jsx("polygon", { points: "5 4 15 12 5 20 5 4" }),
          /* @__PURE__ */ jsx("line", { x1: "19", y1: "5", x2: "19", y2: "19", stroke: "currentColor", strokeWidth: "2" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "pomo-btn pomo-btn-secondary", onClick: handleReset, disabled: !canControl, title: "Reiniciar", children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsx("polyline", { points: "1 4 1 10 7 10" }),
          /* @__PURE__ */ jsx("path", { d: "M3.51 15a9 9 0 1 0 .49-4.45" })
        ] }) }),
        /* @__PURE__ */ jsx("button", { className: "pomo-btn pomo-btn-secondary", onClick: () => setShowSettings((s) => !s), title: "Configuración", children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
          /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
        ] }) })
      ] }),
      !canControl && /* @__PURE__ */ jsx("p", { className: "pomo-guest-notice", children: "Solo el dueño de la sala puede controlar el timer" }),
      showSettings && /* @__PURE__ */ jsxs("div", { className: "pomo-settings", children: [
        /* @__PURE__ */ jsxs("div", { className: "pomo-setting-row", children: [
          /* @__PURE__ */ jsx("label", { className: "pomo-setting-label", children: "Trabajo (min)" }),
          /* @__PURE__ */ jsxs("div", { className: "pomo-setting-controls", children: [
            /* @__PURE__ */ jsx("button", { className: "pomo-setting-btn", onClick: () => setWorkMin((m) => Math.max(1, m - 5)), children: "−" }),
            /* @__PURE__ */ jsx("span", { className: "pomo-setting-value", children: workMin }),
            /* @__PURE__ */ jsx("button", { className: "pomo-setting-btn", onClick: () => setWorkMin((m) => Math.min(90, m + 5)), children: "+" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pomo-setting-row", children: [
          /* @__PURE__ */ jsx("label", { className: "pomo-setting-label", children: "Descanso (min)" }),
          /* @__PURE__ */ jsxs("div", { className: "pomo-setting-controls", children: [
            /* @__PURE__ */ jsx("button", { className: "pomo-setting-btn", onClick: () => setBreakMin((m) => Math.max(1, m - 1)), children: "−" }),
            /* @__PURE__ */ jsx("span", { className: "pomo-setting-value", children: breakMin }),
            /* @__PURE__ */ jsx("button", { className: "pomo-setting-btn", onClick: () => setBreakMin((m) => Math.min(30, m + 1)), children: "+" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pomo-room-section", children: !roomId ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "pomo-room-actions", children: [
          /* @__PURE__ */ jsxs("button", { className: "pomo-room-btn", onClick: createRoom, disabled: creatingRoom, children: [
            /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
              /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
            ] }),
            creatingRoom ? "Creando..." : "Crear sala"
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "pomo-room-btn pomo-room-btn-ghost",
              onClick: () => {
                setShowJoinInput((j) => !j);
                setJoinError("");
              },
              children: "Unirse con código"
            }
          )
        ] }),
        showJoinInput && /* @__PURE__ */ jsxs("div", { className: "pomo-join-form", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              className: "pomo-join-input",
              type: "text",
              placeholder: "ABC123",
              value: joinCode,
              onChange: (e) => setJoinCode(e.target.value.toUpperCase()),
              maxLength: 6,
              onKeyDown: (e) => e.key === "Enter" && joinCode.length === 6 && joinRoom()
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "pomo-room-btn",
              onClick: joinRoom,
              disabled: joiningRoom || joinCode.length < 6,
              children: joiningRoom ? "..." : "Unirse"
            }
          ),
          joinError && /* @__PURE__ */ jsx("p", { className: "pomo-join-error", children: joinError })
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "pomo-room-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "pomo-room-header", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("span", { className: "pomo-room-label", children: isOwner ? "Tu sala" : "Sala colaborativa" }),
            inviteCode && /* @__PURE__ */ jsx("span", { className: "pomo-room-code", children: inviteCode })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pomo-room-header-actions", children: [
            isOwner && /* @__PURE__ */ jsx("button", { className: "pomo-share-btn", onClick: shareRoom, children: copied ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
              " ¡Copiado!"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("path", { d: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" }),
                /* @__PURE__ */ jsx("polyline", { points: "16 6 12 2 8 6" }),
                /* @__PURE__ */ jsx("line", { x1: "12", y1: "2", x2: "12", y2: "15" })
              ] }),
              " Compartir"
            ] }) }),
            /* @__PURE__ */ jsx("button", { className: "pomo-leave-btn", onClick: leaveRoom, children: "Salir" })
          ] })
        ] }),
        members.length > 0 && /* @__PURE__ */ jsx("div", { className: "pomo-members", children: members.map((m) => /* @__PURE__ */ jsxs("div", { className: "pomo-member-chip", children: [
          /* @__PURE__ */ jsx("span", { className: "pomo-member-dot" }),
          m.username || m.user_id.slice(0, 8),
          m.user_id === userId && /* @__PURE__ */ jsx("span", { className: "pomo-member-you", children: " (vos)" })
        ] }, m.user_id)) })
      ] }) })
    ] }),
    cyclesCompleted > 0 && /* @__PURE__ */ jsx("div", { className: "pomo-cycles", children: Array.from({ length: cyclesCompleted }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "pomo-cycle-dot", title: `Sesión ${i + 1}` }, i)) })
  ] });
}

const NAV_ITEMS = [
  { id: "home", label: "Inicio", icon: "🏠" },
  { id: "pomodoro", label: "Pomodoro", icon: "⏱️" },
  { id: "todos", label: "Tareas", icon: "✅" },
  { id: "spaced", label: "Estudio espaciado", icon: "🧠" },
  { id: "ranking", label: "Ranking", icon: "🏆" }
];
function Dashboard() {
  const [user, setUser] = useState(null);
  const [section, setSection] = useState("home");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = "/";
        return;
      }
      await supabase.from("profiles").upsert({
        id: data.user.id,
        username: data.user.user_metadata?.name ?? data.user.email,
        avatar_url: data.user.user_metadata?.avatar_url ?? null
      }, { onConflict: "id", ignoreDuplicates: true });
      setUser(data.user);
      setLoading(false);
    });
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "dash-loading", children: /* @__PURE__ */ jsx("div", { className: "dash-spinner" }) });
  }
  const name = user?.user_metadata?.name ?? user?.email ?? "Usuario";
  const avatar = user?.user_metadata?.avatar_url;
  const initials = name.charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxs("div", { className: "dash-shell", children: [
    /* @__PURE__ */ jsxs("aside", { className: "dash-sidebar", children: [
      /* @__PURE__ */ jsx("div", { className: "sidebar-logo", children: "estudiemos" }),
      /* @__PURE__ */ jsx("nav", { className: "sidebar-nav", children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxs(
        "button",
        {
          className: `sidebar-item${section === item.id ? " active" : ""}`,
          onClick: () => setSection(item.id),
          children: [
            /* @__PURE__ */ jsx("span", { className: "sidebar-icon", children: item.icon }),
            /* @__PURE__ */ jsx("span", { children: item.label })
          ]
        },
        item.id
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "sidebar-footer", children: [
        /* @__PURE__ */ jsxs("div", { className: "sidebar-user", children: [
          avatar ? /* @__PURE__ */ jsx("img", { src: avatar, alt: name, className: "user-avatar" }) : /* @__PURE__ */ jsx("div", { className: "user-initials", children: initials }),
          /* @__PURE__ */ jsx("span", { className: "user-name", children: name.split(" ")[0] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "logout-btn", onClick: handleLogout, title: "Cerrar sesión", children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
          /* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
          /* @__PURE__ */ jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "dash-main", children: [
      section === "home" && /* @__PURE__ */ jsx(HomeSection, { user, onNavigate: setSection }),
      section === "pomodoro" && /* @__PURE__ */ jsx(PomodoroSection, { userId: user.id }),
      section === "todos" && /* @__PURE__ */ jsx(TodoSection, { userId: user.id }),
      section === "spaced" && /* @__PURE__ */ jsx(Placeholder, { title: "Estudio espaciado", icon: "🧠", desc: "Próximamente" }),
      section === "ranking" && /* @__PURE__ */ jsx(Placeholder, { title: "Ranking", icon: "🏆", desc: "Próximamente" })
    ] })
  ] });
}
function HomeSection({ user, onNavigate }) {
  const [streak, setStreak] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(null);
  const [pendingTodos, setPendingTodos] = useState(null);
  useEffect(() => {
    if (!user) return;
    supabase.rpc("get_streak", { p_user_id: user.id }).then(({ data }) => setStreak(data ?? 0));
    supabase.from("pomodoro_sessions").select("duration_minutes").eq("user_id", user.id).eq("completed", true).then(({ data }) => {
      const total = (data ?? []).reduce((sum, s) => sum + s.duration_minutes, 0);
      setTotalMinutes(total);
    });
    supabase.from("todos").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("completed", false).then(({ count }) => setPendingTodos(count ?? 0));
  }, [user]);
  const name = user?.user_metadata?.name ?? "Usuario";
  const hour = (/* @__PURE__ */ new Date()).getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
  return /* @__PURE__ */ jsxs("div", { className: "section-content", children: [
    /* @__PURE__ */ jsxs("div", { className: "home-header", children: [
      /* @__PURE__ */ jsxs("h1", { className: "home-title", children: [
        greeting,
        ", ",
        name.split(" ")[0],
        " 👋"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "home-subtitle", children: "¿Qué vas a estudiar hoy?" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "stats-grid", children: [
      /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsx("div", { className: "stat-icon", children: "🔥" }),
        /* @__PURE__ */ jsx("div", { className: "stat-value", children: streak ?? "—" }),
        /* @__PURE__ */ jsx("div", { className: "stat-label", children: "días de racha" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsx("div", { className: "stat-icon", children: "⏱️" }),
        /* @__PURE__ */ jsx("div", { className: "stat-value", children: totalMinutes ?? "—" }),
        /* @__PURE__ */ jsx("div", { className: "stat-label", children: "minutos estudiados" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsx("div", { className: "stat-icon", children: "✅" }),
        /* @__PURE__ */ jsx("div", { className: "stat-value", children: pendingTodos ?? "—" }),
        /* @__PURE__ */ jsx("div", { className: "stat-label", children: "tareas pendientes" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "quick-actions", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-heading", children: "Accesos rápidos" }),
      /* @__PURE__ */ jsxs("div", { className: "actions-grid", children: [
        /* @__PURE__ */ jsx(QuickCard, { icon: "⏱️", title: "Iniciar Pomodoro", desc: "Arrancá una sesión de estudio", onClick: () => onNavigate("pomodoro") }),
        /* @__PURE__ */ jsx(QuickCard, { icon: "✅", title: "Nueva tarea", desc: "Agregá algo a tu lista", onClick: () => onNavigate("todos") }),
        /* @__PURE__ */ jsx(QuickCard, { icon: "🧠", title: "Repasar hoy", desc: "Temas que vencen hoy", onClick: () => onNavigate("spaced") })
      ] })
    ] })
  ] });
}
function QuickCard({ icon, title, desc, onClick }) {
  return /* @__PURE__ */ jsxs("button", { className: "quick-card", onClick, children: [
    /* @__PURE__ */ jsx("span", { className: "quick-icon", children: icon }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "quick-title", children: title }),
      /* @__PURE__ */ jsx("div", { className: "quick-desc", children: desc })
    ] })
  ] });
}
function Placeholder({ title, icon, desc }) {
  return /* @__PURE__ */ jsxs("div", { className: "section-content placeholder-section", children: [
    /* @__PURE__ */ jsx("div", { className: "placeholder-icon", children: icon }),
    /* @__PURE__ */ jsx("h1", { className: "placeholder-title", children: title }),
    /* @__PURE__ */ jsx("p", { className: "placeholder-desc", children: desc })
  ] });
}

const $$Dashboard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Dashboard" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "DashboardApp", Dashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/nicolasrame/Documents/Workspace/estudiemos/src/components/Dashboard", "client:component-export": "Dashboard" })} ` })}`;
}, "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/dashboard.astro", void 0);

const $$file = "/Users/nicolasrame/Documents/Workspace/estudiemos/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

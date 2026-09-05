import { useState } from "react";

type Task = {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "doing" | "done";
  assignee: string;
  due: string;
};

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Redesign onboarding flow", priority: "high", status: "todo", assignee: "Ana Lima", due: "12 Set" },
  { id: 2, title: "Corrigir bug no checkout", priority: "high", status: "todo", assignee: "Marcos R.", due: "10 Set" },
  { id: 3, title: "Escrever testes unitários", priority: "medium", status: "todo", assignee: "Julia P.", due: "15 Set" },
  { id: 4, title: "Atualizar dependências", priority: "low", status: "doing", assignee: "Carlos M.", due: "11 Set" },
  { id: 5, title: "Implementar dark mode", priority: "medium", status: "doing", assignee: "Ana Lima", due: "13 Set" },
  { id: 6, title: "Migração para TypeScript", priority: "high", status: "done", assignee: "Marcos R.", due: "08 Set" },
  { id: 7, title: "Setup CI/CD pipeline", priority: "medium", status: "done", assignee: "Julia P.", due: "07 Set" },
  { id: 8, title: "Documentar API REST", priority: "low", status: "todo", assignee: "Carlos M.", due: "18 Set" },
];

const PRIORITY_STYLES = {
  high: "bg-red-500/15 text-red-400 border border-red-500/20",
  medium: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  low: "bg-sky-500/15 text-sky-400 border border-sky-500/20",
};

const PRIORITY_LABELS = { high: "Alta", medium: "Média", low: "Baixa" };

const AVATAR_COLORS: Record<string, string> = {
  "Ana Lima": "bg-violet-500",
  "Marcos R.": "bg-sky-500",
  "Julia P.": "bg-pink-500",
  "Carlos M.": "bg-amber-500",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

// ── Login ──────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === "admin@tasks.com" && password === "123456") {
        onLogin();
      } else {
        setError("E-mail ou senha incorretos.");
      }
    }, 900);
  }

  return (
    <div className="min-h-full flex items-center justify-center px-4" style={{ background: "#0f1117" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#34d399" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h8M2 12h5" stroke="#0a0f0d" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-tight" style={{ color: "#e8eaf0" }}>
              task<span style={{ color: "#34d399" }}>board</span>
            </span>
          </div>
          <p className="text-sm" style={{ color: "#6b7280" }}>Entre para acessar seu workspace</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8" style={{ background: "#1a1d27", border: "1px solid #2a2d3e" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9ba3af" }}>E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tasks.com"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-[#4b5563]"
                style={{
                  background: "#0f1117",
                  border: "1px solid #2a2d3e",
                  color: "#e8eaf0",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#34d399")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2d3e")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "#9ba3af" }}>Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-[#4b5563]"
                style={{
                  background: "#0f1117",
                  border: "1px solid #2a2d3e",
                  color: "#e8eaf0",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#34d399")}
                onBlur={(e) => (e.target.style.borderColor = "#2a2d3e")}
              />
              <p className="mt-1.5 text-xs text-right" style={{ color: "#6b7280" }}>
                Dica: admin@tasks.com / 123456
              </p>
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: loading ? "#1e4d3a" : "#34d399",
                color: "#0a0f0d",
                opacity: loading ? 0.8 : 1,
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget.style.background = "#6ee7b7"); }}
              onMouseLeave={(e) => { if (!loading) (e.currentTarget.style.background = "#34d399"); }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Task Card ──────────────────────────────────────────────────────────────

function TaskCard({ task, onMove, onDelete }: { task: Task; onMove: (id: number, status: Task["status"]) => void; onDelete: (id: number) => void }) {
  const statuses: Task["status"][] = ["todo", "doing", "done"];
  const currentIdx = statuses.indexOf(task.status);

  return (
    <div
      className="rounded-xl p-4 group transition-all duration-200"
      style={{ background: "#1a1d27", border: "1px solid #2a2d3e" }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3a3d50")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2d3e")}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <p className="text-sm font-medium leading-snug flex-1" style={{ color: "#e8eaf0" }}>{task.title}</p>
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity rounded p-0.5 hover:text-red-400"
          style={{ color: "#6b7280" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${PRIORITY_STYLES[task.priority]}`}>
          {PRIORITY_LABELS[task.priority]}
        </span>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{task.due}</span>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${AVATAR_COLORS[task.assignee] ?? "bg-gray-500"}`}>
            {initials(task.assignee)}
          </div>
        </div>
      </div>

      {/* Move buttons */}
      <div className="flex gap-1.5 mt-3 pt-3" style={{ borderTop: "1px solid #2a2d3e" }}>
        {currentIdx > 0 && (
          <button
            onClick={() => onMove(task.id, statuses[currentIdx - 1])}
            className="text-xs px-2 py-1 rounded-lg transition-colors"
            style={{ color: "#9ba3af", background: "#252836" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9ba3af")}
          >
            ← Voltar
          </button>
        )}
        {currentIdx < 2 && (
          <button
            onClick={() => onMove(task.id, statuses[currentIdx + 1])}
            className="text-xs px-2 py-1 rounded-lg transition-colors ml-auto"
            style={{ color: "#34d399", background: "#0d2e22" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0f3a2b")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0d2e22")}
          >
            Avançar →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Add Task Modal ─────────────────────────────────────────────────────────

function AddTaskModal({ onAdd, onClose }: { onAdd: (t: Omit<Task, "id">) => void; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [status, setStatus] = useState<Task["status"]>("todo");
  const [assignee, setAssignee] = useState("Ana Lima");
  const [due, setDue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), priority, status, assignee, due: due || "—" });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: "#1a1d27", border: "1px solid #2a2d3e" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold" style={{ color: "#e8eaf0" }}>Nova tarefa</h2>
          <button onClick={onClose} style={{ color: "#6b7280" }} className="hover:text-red-400 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "#9ba3af" }}>Título</label>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Descreva a tarefa..."
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{ background: "#0f1117", border: "1px solid #2a2d3e", color: "#e8eaf0" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#9ba3af" }}>Prioridade</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as Task["priority"])}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#0f1117", border: "1px solid #2a2d3e", color: "#e8eaf0" }}>
                <option value="high">Alta</option>
                <option value="medium">Média</option>
                <option value="low">Baixa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#9ba3af" }}>Coluna</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Task["status"])}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#0f1117", border: "1px solid #2a2d3e", color: "#e8eaf0" }}>
                <option value="todo">A fazer</option>
                <option value="doing">Em andamento</option>
                <option value="done">Concluído</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#9ba3af" }}>Responsável</label>
              <select value={assignee} onChange={(e) => setAssignee(e.target.value)}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#0f1117", border: "1px solid #2a2d3e", color: "#e8eaf0" }}>
                <option>Ana Lima</option>
                <option>Marcos R.</option>
                <option>Julia P.</option>
                <option>Carlos M.</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#9ba3af" }}>Prazo</label>
              <input
                value={due}
                onChange={(e) => setDue(e.target.value)}
                placeholder="ex: 20 Set"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: "#0f1117", border: "1px solid #2a2d3e", color: "#e8eaf0" }}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{ background: "#252836", color: "#9ba3af" }}>
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              style={{ background: "#34d399", color: "#0a0f0d" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6ee7b7")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#34d399")}>
              Criar tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────

const COLUMNS: { key: Task["status"]; label: string; color: string }[] = [
  { key: "todo", label: "A fazer", color: "#6b7280" },
  { key: "doing", label: "Em andamento", color: "#f59e0b" },
  { key: "done", label: "Concluído", color: "#34d399" },
];

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<Task["priority"] | "all">("all");
  const [showModal, setShowModal] = useState(false);
  const [nextId, setNextId] = useState(100);

  function moveTask(id: number, status: Task["status"]) {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status } : t));
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addTask(data: Omit<Task, "id">) {
    setTasks((prev) => [...prev, { id: nextId, ...data }]);
    setNextId((n) => n + 1);
  }

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.priority === filter);
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="min-h-full flex flex-col" style={{ background: "#0f1117" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4" style={{ borderBottom: "1px solid #1e2130" }}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#34d399" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 3.5h11M1.5 7h7M1.5 10.5h4.5" stroke="#0a0f0d" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-base font-semibold tracking-tight" style={{ color: "#e8eaf0" }}>
            task<span style={{ color: "#34d399" }}>board</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Progress */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-28 h-1.5 rounded-full overflow-hidden" style={{ background: "#252836" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: "#34d399" }} />
            </div>
            <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{done}/{total} concluídas</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors"
            style={{ background: "#34d399", color: "#0a0f0d" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#6ee7b7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#34d399")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            Nova tarefa
          </button>

          <button onClick={onLogout} className="text-sm transition-colors" style={{ color: "#6b7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}>
            Sair
          </button>
        </div>
      </header>

      {/* Filter bar */}
      <div className="flex items-center gap-2 px-8 py-4">
        <span className="text-xs mr-1" style={{ color: "#6b7280" }}>Filtrar:</span>
        {(["all", "high", "medium", "low"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className="text-xs px-3 py-1.5 rounded-lg transition-all font-medium"
            style={{
              background: filter === p ? "#34d399" : "#1e2130",
              color: filter === p ? "#0a0f0d" : "#9ba3af",
              border: `1px solid ${filter === p ? "#34d399" : "#2a2d3e"}`,
            }}
          >
            {p === "all" ? "Todas" : PRIORITY_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Kanban */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 px-8 pb-8" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        {COLUMNS.map((col) => {
          const colTasks = filtered.filter((t) => t.status === col.key);
          return (
            <div key={col.key} className="flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center gap-2 py-2">
                <div className="w-2 h-2 rounded-full" style={{ background: col.color }} />
                <span className="text-sm font-medium" style={{ color: "#e8eaf0" }}>{col.label}</span>
                <span className="text-xs ml-auto font-mono px-1.5 py-0.5 rounded-md" style={{ background: "#1e2130", color: "#6b7280" }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-3">
                {colTasks.length === 0 && (
                  <div className="rounded-xl py-10 text-center text-sm" style={{ border: "1px dashed #2a2d3e", color: "#4b5563" }}>
                    Nenhuma tarefa
                  </div>
                )}
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onMove={moveTask} onDelete={deleteTask} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showModal && <AddTaskModal onAdd={addTask} onClose={() => setShowModal(false)} />}
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <LoginScreen onLogin={() => setLoggedIn(true)} />;
}

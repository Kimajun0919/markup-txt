import { useState } from "react";
import AiTxtGenerator from "./features/ai/AiTxtGenerator";
import LlmsTxtGenerator from "./features/ai/LlmsTxtGenerator";
import MarkupSearch from "./features/markup-search/MarkupSearch";

const tools = [
  {
    id: "markup",
    title: "마크업 타입 검색",
    description: "구조화 데이터 타입과 속성을 빠르게 탐색합니다.",
    panelId: "tool-panel-markup",
  },
  {
    id: "llms",
    title: "llms.txt 생성기",
    description: "사이트 설명, 서비스, FAQ를 단계별로 구조화합니다.",
    panelId: "tool-panel-llms",
  },
  {
    id: "ai",
    title: "ai.txt 생성기",
    description: "AI 크롤러 정책과 사용 규칙을 바로 조합합니다.",
    panelId: "tool-panel-ai",
  },
];

const toolViews = {
  ai: AiTxtGenerator,
  llms: LlmsTxtGenerator,
  markup: MarkupSearch,
};

export default function App() {
  const [activeTool, setActiveTool] = useState("markup");
  const activeToolMeta =
    tools.find((tool) => tool.id === activeTool) ?? tools[0];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-block">
            <span className="brand-kicker">Unified Workspace</span>
            <strong className="brand-title">Markup TXT Studio</strong>
          </div>

          <div className="topbar-status" aria-live="polite">
            <span className="topbar-status-label">현재 도구</span>
            <strong className="topbar-status-value">{activeToolMeta.title}</strong>
          </div>

          <nav className="menu-bar" aria-label="기능 메뉴">
            <div className="tool-tab-row" role="tablist" aria-label="기능 메뉴">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  id={`tab-${tool.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTool === tool.id}
                  aria-controls={tool.panelId}
                  className={`tool-tab ${activeTool === tool.id ? "is-active" : ""}`}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <strong>{tool.title}</strong>
                  <span>{tool.description}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="workspace-shell">
        <div className="tool-view">
          {tools.map((tool) => (
            <ToolPanel
              key={tool.id}
              id={tool.panelId}
              labelId={`tab-${tool.id}`}
              hidden={activeTool !== tool.id}
              Component={toolViews[tool.id]}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function ToolPanel({ id, labelId, hidden, Component }) {
  return (
    <section
      id={id}
      role="tabpanel"
      aria-labelledby={labelId}
      className="tool-panel"
      hidden={hidden}
    >
      <Component />
    </section>
  );
}

import { useState } from "react";
import AiTxtGenerator from "./features/ai/AiTxtGenerator";
import LlmsTxtGenerator from "./features/ai/LlmsTxtGenerator";
import MarkupSearch from "./features/markup-search/MarkupSearch";

const tools = [
  {
    id: "ai",
    title: "ai.txt 생성기",
    description: "AI 크롤러 정책과 사용 규칙을 바로 조합합니다.",
    panelId: "tool-panel-ai",
  },
  {
    id: "llms",
    title: "llms.txt 생성기",
    description: "사이트 설명, 서비스, FAQ를 단계별로 구조화합니다.",
    panelId: "tool-panel-llms",
  },
  {
    id: "markup",
    title: "마크업 타입 검색",
    description: "구조화 데이터 타입과 속성을 빠르게 탐색합니다.",
    panelId: "tool-panel-markup",
  },
];

const toolViews = {
  ai: <AiTxtGenerator />,
  llms: <LlmsTxtGenerator />,
  markup: <MarkupSearch />,
};

export default function App() {
  const [activeTool, setActiveTool] = useState("ai");
  const activeToolMeta =
    tools.find((tool) => tool.id === activeTool) ?? tools[0];

  return (
    <div className="page-shell">
      <nav className="panel suite-nav">
        <div className="suite-copy">
          <p className="eyebrow">Unified Markup Workspace</p>
          <h1>AI TXT & Markup Studio</h1>
          <p className="hero-description">
            `ai.txt`, `llms.txt`, 구조화 데이터 타입 탐색을 하나의 프로젝트로
            묶었습니다. 상단 메뉴에서 기능을 전환해도 각 화면의 입력 상태는
            유지됩니다.
          </p>
          <div className="suite-active-badge">
            현재 작업: <strong>{activeToolMeta.title}</strong>
          </div>
        </div>

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

      <div className="tool-view">
        {tools.map((tool) => (
          <section
            key={tool.id}
            id={tool.panelId}
            role="tabpanel"
            aria-labelledby={`tab-${tool.id}`}
            className="tool-panel"
            hidden={activeTool !== tool.id}
          >
            {toolViews[tool.id]}
          </section>
        ))}
      </div>
    </div>
  );
}

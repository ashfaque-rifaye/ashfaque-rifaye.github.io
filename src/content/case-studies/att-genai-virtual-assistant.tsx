import { BeforeAfter } from '../../components/case-study/BeforeAfter';
import { PullQuote } from '../../components/case-study/Blocks';
import type { CaseStudyContent } from '../../components/case-study/CaseLayout';
import { Decisions } from '../../components/case-study/Decisions';
import { Figure } from '../../components/diagrams/Figure';
import { FlowSteps } from '../../components/diagrams/FlowSteps';
import { LayerStack } from '../../components/diagrams/LayerStack';
import { MetricColumns } from '../../components/diagrams/MetricColumns';
import { Todo } from '../../components/ui/Todo';

export const attGenaiVirtualAssistant: CaseStudyContent = {
  slug: 'att-genai-virtual-assistant',
  number: '01',
  lede: (
    <>
      <p>
        AT&amp;T&rsquo;s consumer business talks to customers across chat, voice, WhatsApp and RCS. The virtual assistant is
        the first line of that conversation, and it handles <strong>1.5M+ customer interactions a month</strong>.
      </p>
      <p>
        I own it end to end as product owner: conversation design, retrieval, the integrations that connect it to
        telephony and CRM, the KPI framework, and the roadmap that two development squads deliver.
      </p>
    </>
  ),
  facts: [
    { key: 'Role', value: 'Product owner (AI Technical Business Analyst, PM)' },
    { key: 'Org', value: 'AT&T Consumer Technology & Experience' },
    { key: 'Period', value: 'Aug 2022 – present' },
    { key: 'Team', value: '2 squads, 18 developers; 12-person cross-functional core team' },
    { key: 'Platform', value: 'Google CCAI · Dialogflow CX · RAG · REST APIs' },
    { key: 'Channels', value: 'Chat · Voice · WhatsApp · RCS' },
  ],
  keyMetrics: [
    { value: '1.5M+', label: 'Monthly customer interactions' },
    { value: '55%', label: 'Containment rate' },
    { value: '28%', label: 'Fewer live-agent escalations' },
    { value: '$4.2M', label: 'Estimated annual operational savings' },
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: (
        <div className="prose-case">
          <p>
            Customer care at telecom scale is a volume business. Every contact the assistant resolves is one a live agent
            doesn&rsquo;t have to take, and every contact it can&rsquo;t resolve still has to end well.
          </p>
          <p>
            The assistant runs on Google Contact Center AI and Dialogflow, with generative AI and retrieval layered in. It
            serves AT&amp;T&rsquo;s consumer line of business across four channels, so one conversation model has to behave
            well in a voice call and in a WhatsApp thread.
          </p>
        </div>
      ),
    },
    {
      id: 'problem',
      title: 'Problem',
      body: (
        <div className="prose-case">
          <p>
            Care was carrying high volumes of repetitive contacts across chat, voice, WhatsApp and RCS. Handle times were
            long, and live-agent escalations were expensive. Three things made it harder than adding a chatbot:
          </p>
          <ul>
            <li>
              <strong>Answers had to be current and approved.</strong> Plans, policies and procedures change, and an
              assistant answering from stale content loses customer trust quickly.
            </li>
            <li>
              <strong>Many issues need the customer&rsquo;s account.</strong> Without integration into backend systems, the
              assistant can explain but not resolve.
            </li>
            <li>
              <strong>Escalations started cold.</strong> When the assistant handed off, the agent needed context the
              assistant already had.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'opportunity',
      title: 'Opportunity',
      body: (
        <div className="prose-case">
          <p>
            Two levers had direct cost impact: <strong>containment</strong>, the share of conversations resolved without a
            live agent, and <strong>handle time</strong> on the conversations that do reach one. At 1.5M+ interactions a
            month, a few points of containment or a few seconds of handle time move a seven-figure number.
          </p>
          <p>
            A third lever protected the first two: <strong>quality</strong>. Containment bought with wrong answers returns
            as repeat contacts and lower satisfaction, so the goal was containment with guardrails, not containment at any
            cost.
          </p>
        </div>
      ),
    },
    {
      id: 'thesis',
      title: 'Product thesis',
      body: (
        <>
          <PullQuote>
            An assistant earns containment when it understands the intent, answers from current and approved knowledge,
            can act on the account, and hands off with context when it can&rsquo;t.
          </PullQuote>
          <div className="prose-case">
            <p>
              That put intent design, retrieval quality, integrations and graceful escalation ahead of model choice. The
              model matters, but it is one layer of several.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'journey',
      title: 'Users and journey',
      body: (
        <>
          <div className="prose-case">
            <p>Four groups depend on the assistant, and each one judges it differently:</p>
            <ul>
              <li><strong>Customers</strong> on four channels want a resolution, not a conversation.</li>
              <li><strong>Live agents</strong> receive the escalations and need the context that came before them.</li>
              <li><strong>Care operations and leadership</strong> run the business on containment, handle time and satisfaction.</li>
              <li><strong>Business SMEs</strong> own the knowledge the assistant answers from.</li>
            </ul>
          </div>
          <Figure
            n="1.1"
            title="The customer journey through the assistant"
            note="Accuracy, containment and handle-time figures are program-level results from the KPI dashboards."
          >
            <FlowSteps
              steps={[
                { kicker: 'Ask', title: 'Customer starts on any channel', detail: 'Chat, voice, WhatsApp or RCS' },
                { kicker: 'Understand', title: 'Intent recognized', detail: '350+ intents, 1,200+ training phrases', metric: '92% intent accuracy' },
                { kicker: 'Answer or act', title: 'Knowledge or account action', detail: 'Retrieval over approved knowledge, or a backend API call', accent: true },
                { kicker: 'Resolve', title: 'Contained in the assistant', metric: '55% containment' },
                { kicker: 'Hand off', title: 'Escalated with context', detail: 'The agent receives the conversation so far', metric: '32 sec lower handle time' },
              ]}
            />
          </Figure>
        </>
      ),
    },
    {
      id: 'role',
      title: 'My role',
      body: (
        <div className="prose-case">
          <p>I own the assistant end to end. In practice:</p>
          <ul>
            <li>
              <strong>Product ownership and roadmap.</strong> I align the AI roadmap with CX objectives alongside US product
              owners, enterprise architects and business SMEs. That work secured a $2.5M budget for FY25 enhancements.
            </li>
            <li>
              <strong>Conversation design.</strong> The intent model (350+ intents, 1,200+ training phrases) and the
              retrieval-backed answers behind it.
            </li>
            <li>
              <strong>Integration architecture.</strong> How the AI layer connects to telephony infrastructure and backend
              CRMs through REST APIs.
            </li>
            <li>
              <strong>KPI strategy.</strong> Power BI and SQL dashboards across 15+ metrics, including containment, CSAT,
              intent accuracy and fallback rate.
            </li>
            <li>
              <strong>Delivery.</strong> Backlog grooming and sprint planning for two squads (18 developers) in SAFe, at 95%
              sprint-commitment reliability.
            </li>
            <li>
              <strong>Documentation.</strong> Process flows, data-flow diagrams and BRDs for a 12-person cross-functional
              team across engineering, UX and operations.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'decisions',
      title: 'Key decisions',
      body: (
        <>
          <div className="prose-case">
            <p>These choices shaped the product. Each one traded something away.</p>
          </div>
          <Decisions
            items={[
              {
                decision: 'Ground answers in retrieved knowledge, not only scripted responses',
                why: 'Scripted responses go stale as plans and policies change. Retrieval over approved knowledge keeps answers current.',
                tradeoff: 'Retrieval quality becomes a product surface to manage: content ownership, freshness and review.',
              },
              {
                decision: 'Route low-confidence answers to human review',
                why: 'A confident wrong answer costs more trust than a handoff. Flagging low-confidence responses keeps quality visible.',
                tradeoff: 'Review workload for the team, in exchange for a feedback loop that improves intents and knowledge.',
              },
              {
                decision: 'Treat escalation as part of the product',
                why: 'Not every contact should be contained. Passing context to the agent through telephony and CRM integration makes the handoff faster.',
                tradeoff: 'More integration scope and dependency on backend teams, repaid as 32 seconds lower handle time per interaction.',
              },
              {
                decision: 'Read containment alongside quality guardrails',
                why: 'Containment alone rewards a bot that never lets go. Intent accuracy, fallback rate and CSAT keep it honest.',
                tradeoff: 'More metrics to maintain, and containment targets that have to answer to quality.',
              },
              {
                decision: 'Treat tokens and latency as product constraints',
                why: 'GenAI cost and response time grow with volume, so token usage and API cost are tracked with engineering next to response times.',
                tradeoff: 'Cost and speed are weighed against response richness on every GenAI feature.',
              },
            ]}
          />
          <div className="mt-6">
            <Todo>Add one decision you personally drove that isn&rsquo;t listed, with the alternative you rejected.</Todo>
          </div>
        </>
      ),
    },
    {
      id: 'solution',
      title: 'Solution',
      body: (
        <div className="prose-case">
          <p>An omnichannel GenAI virtual assistant on Google CCAI and Dialogflow CX:</p>
          <ul>
            <li><strong>One conversation model, four channels:</strong> chat, voice, WhatsApp and RCS.</li>
            <li>
              <strong>350+ intents and 1,200+ training phrases</strong>, with generative responses grounded by retrieval over
              approved knowledge.
            </li>
            <li><strong>REST integrations</strong> to telephony infrastructure and backend CRMs for real-time context.</li>
            <li><strong>Human-in-the-loop review</strong> of low-confidence responses.</li>
            <li><strong>An AI performance analytics suite:</strong> real-time monitoring across 6 channels and 15+ KPIs.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'architecture',
      title: 'Technical architecture',
      body: (
        <>
          <div className="prose-case">
            <p>A simplified view of the request path, top to bottom, and the loop that improves it. Vendor internals are omitted.</p>
          </div>
          <Figure n="1.2" title="AI architecture: request path and improvement loop">
            <LayerStack
              layers={[
                { name: 'Customer', role: 'Consumer line of business', nodes: [{ label: 'Consumer customers' }], note: 'Consumer customers reaching AT&T care.' },
                { name: 'Channel', role: 'Omnichannel entry', nodes: [{ label: 'Chat' }, { label: 'Voice (telephony)' }, { label: 'WhatsApp' }, { label: 'RCS' }], note: 'One conversation model serves all four channels.' },
                { name: 'Conversation layer', role: 'Google CCAI · Dialogflow CX', nodes: [{ label: 'Dialog and session state' }, { label: 'Channel handling' }], note: 'Dialogflow CX manages the conversation, its state and channel specifics.' },
                { name: 'Intent and LLM processing', role: 'Understanding and generation', nodes: [{ label: '350+ intents' }, { label: '1,200+ training phrases' }, { label: 'Generative responses', accent: true }], note: 'Intent recognition runs at 92% accuracy; generative AI shapes the reply.' },
                { name: 'RAG and knowledge', role: 'Grounding', nodes: [{ label: 'Approved knowledge sources' }, { label: 'Retrieval', accent: true }, { label: 'Grounded answer' }], note: 'Answers are grounded in retrieved, approved knowledge instead of static scripts.' },
                { name: 'Backend APIs', role: 'REST', nodes: [{ label: 'Context lookup' }, { label: 'Account actions' }], note: 'REST APIs enrich each conversation with real-time customer context.' },
                { name: 'CRM, telephony and enterprise systems', role: 'Systems of record', nodes: [{ label: 'CRM' }, { label: 'Telephony infrastructure' }, { label: 'Enterprise systems' }], note: 'The integration ecosystem I architected connects the AI layer to these systems.' },
                { name: 'Resolution or escalation', role: 'Outcome', nodes: [{ label: 'Resolved in the assistant · 55%', accent: true }, { label: 'Live agent, with context' }], note: 'Escalations fell 28%; context-rich handoffs cut handle time by 32 seconds.' },
              ]}
              rail={{
                title: 'Improvement loop',
                items: ['Power BI and SQL dashboards, 15+ KPIs', 'Human review of low-confidence answers', 'Token, cost and latency monitoring', 'Intent and knowledge tuning'],
                note: 'What the dashboards and reviewers find flows back into intents, training phrases and knowledge.',
              }}
            />
          </Figure>
        </>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery and execution',
      body: (
        <>
          <div className="prose-case">
            <p>
              Two development squads (18 developers) deliver the roadmap in SAFe. I own the backlog and sprint planning; the
              squads hold 95% sprint-commitment reliability, tracked in Jira and Confluence.
            </p>
          </div>
          <Figure n="1.3" title="From roadmap to release">
            <FlowSteps
              steps={[
                { kicker: 'Align', title: 'Roadmap', detail: 'Tied to CX objectives with US product owners, architects and SMEs', metric: '$2.5M FY25 budget' },
                { kicker: 'Specify', title: 'Backlog', detail: 'BRDs, process flows and data-flow diagrams' },
                { kicker: 'Build', title: 'Two squads', detail: '18 developers in SAFe sprints', metric: '95% sprint reliability', accent: true },
                { kicker: 'Ship', title: 'Release', detail: 'Chat, voice, WhatsApp and RCS' },
                { kicker: 'Learn', title: 'Measure', detail: '15+ KPIs feed the next iteration' },
              ]}
            />
          </Figure>
          <div className="prose-case">
            <p>
              Stakeholders span engineering, UX and operations in India and product, architecture and business teams in the
              US. Process flows, data-flow diagrams and BRDs give that 12-person cross-functional team one shared picture.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'metrics',
      title: 'Metrics',
      body: (
        <>
          <div className="prose-case">
            <p>Containment is the headline, and it is always read with the guardrails that keep it honest.</p>
          </div>
          <Figure n="1.4" title="Measurement: watch, move, prove" note="Savings are an estimate of annual operational cost avoided.">
            <MetricColumns
              columns={[
                {
                  title: 'Watch',
                  caption: 'Quality guardrails',
                  items: [{ value: '92%', label: 'Intent recognition accuracy' }, { label: 'Fallback rate' }, { label: 'CSAT' }, { value: '15+', label: 'KPIs monitored' }],
                },
                {
                  title: 'Move',
                  caption: 'Operational levers',
                  accent: true,
                  items: [{ value: '55%', label: 'Containment' }, { value: '−28%', label: 'Live-agent escalations' }, { value: '−32s', label: 'Average handle time' }],
                },
                {
                  title: 'Prove',
                  caption: 'Business outcomes',
                  items: [{ value: '$4.2M', label: 'Estimated annual savings' }, { value: '+8', label: 'NPS points' }, { value: '1.5M+', label: 'Monthly interactions' }],
                },
              ]}
            />
          </Figure>
          <Todo>Add baselines (containment, escalation rate and handle time before) if you can share them, so readers see the delta.</Todo>
        </>
      ),
    },
    {
      id: 'impact',
      title: 'Business impact',
      body: (
        <div className="prose-case">
          <ul>
            <li><strong>An estimated $4.2M a year</strong> in operational savings from higher containment and fewer escalations.</li>
            <li><strong>A $2.5M budget for FY25 enhancements</strong>, secured by tying the roadmap to CX objectives.</li>
            <li><strong>+8 NPS points</strong> from optimizations the KPI dashboards made visible.</li>
            <li>
              <strong>AT&amp;T Connection Award (2023)</strong> for the virtual assistant team, from the Consumer Technology
              &amp; Experience organization.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'changed',
      title: 'What changed',
      body: (
        <>
          <BeforeAfter
            rows={[
              { area: 'Knowledge', before: 'Scripted responses that needed manual upkeep', after: 'Retrieval over approved knowledge grounds each answer' },
              { area: 'Escalation', before: 'Agents rebuilt context the assistant already had', after: 'Context travels through telephony and CRM integration: 32 seconds saved per interaction' },
              { area: 'Quality', before: 'Low-confidence answers went unseen', after: 'Low-confidence answers are flagged for human review' },
              { area: 'Measurement', before: 'Performance was hard to see across channels', after: 'Real-time dashboards across 6 channels and 15+ KPIs' },
            ]}
          />
          <p className="mt-5 text-[0.875rem] leading-relaxed text-ink-3">These rows summarize the program&rsquo;s direction, not a single release.</p>
        </>
      ),
    },
    {
      id: 'learned',
      title: 'What I learned',
      body: (
        <>
          <div className="prose-case">
            <ul>
              <li>
                <strong>Containment is a lagging indicator.</strong> Intent accuracy and fallback rate show where it is
                heading, so I watch them first.
              </li>
              <li>
                <strong>Retrieval quality is a product surface.</strong> An answer is only as good as the knowledge behind it,
                so content ownership belongs on the roadmap next to features.
              </li>
              <li>
                <strong>Escalation is part of the experience.</strong> A good handoff saves seconds on every contact, and a
                contained conversation that should have escalated costs more later.
              </li>
              <li>
                <strong>Guardrails build trust.</strong> Human review of low-confidence answers keeps quality visible to
                everyone who depends on the assistant.
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Todo>Add one thing that didn&rsquo;t work, what you changed, and why. It is the most credible paragraph in a case study.</Todo>
          </div>
        </>
      ),
    },
  ],
};

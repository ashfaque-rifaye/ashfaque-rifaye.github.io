import { Ledger, PullQuote, Steps, SubHead } from '../../components/case-study/Blocks';
import type { CaseStudyContent } from '../../components/case-study/CaseLayout';
import { Decisions } from '../../components/case-study/Decisions';
import { Figure } from '../../components/diagrams/Figure';
import { FlowSteps } from '../../components/diagrams/FlowSteps';
import { LayerStack } from '../../components/diagrams/LayerStack';
import { ArrowAnchor } from '../../components/ui/Links';
import { Todo } from '../../components/ui/Todo';
import { VideoEmbed } from '../../components/ui/VideoEmbed';

/* The walkthrough plays once DEVICEFLEX_VIDEO_PUBLIC is set in content/demos.ts. */
const DEVICEFLEX_REPO = 'https://github.com/ashfaque-rifaye/deviceflex-device-protection';

export const aiProductInnovation: CaseStudyContent = {
  slug: 'ai-product-innovation',
  number: '03',
  lede: (
    <>
      <p>
        This case study is about creating a product from an ambiguous problem, not running an existing one. It follows
        DeviceFlex, which I <strong>conceived, designed and built solo</strong> for AT&amp;T&rsquo;s Sprint-a-thon 2026, now
        backed by an <strong>invention disclosure submitted to AT&amp;T&rsquo;s patent program</strong>.
      </p>
      <p>
        The same method sits behind AT&amp;T Helios, which won Best in Show / All Around at the 2026 Innovation Jam, and
        behind two hackathon wins in 2025.
      </p>
    </>
  ),
  facts: [
    { key: 'Role', value: 'Product lead and sole builder (DeviceFlex)' },
    { key: 'Event', value: 'AT&T Sprint-a-thon 2026' },
    { key: 'Built', value: '19 Aug – 5 Sep 2026 · 100 commits' },
    { key: 'Status', value: 'Working prototype · invention disclosure submitted' },
    { key: 'Stack', value: 'TanStack Start · React 19 · TypeScript · Zod · vision model' },
    { key: 'Track record', value: 'Innovation Jam 2026 · AT&T Hackathon 2025 · Equitech 2025' },
  ],
  keyMetrics: [
    { value: '5', label: 'Inventive mechanisms, all running in the prototype' },
    { value: '17', label: 'Product routes, end to end' },
    { value: '17 days', label: 'From first commit to the demo build' },
    { value: '2026', label: 'Innovation Jam Best in Show / All Around' },
  ],
  sections: [
    {
      id: 'method',
      title: 'The method',
      body: (
        <>
          <div className="prose-case">
            <p>
              I use the same sequence whether the brief is a hackathon prompt or an internal opportunity. The order matters:
              the insight comes before the concept, and the prototype comes before the pitch.
            </p>
          </div>
          <Figure n="3.1" title="From ambiguous problem to a product worth funding">
            <FlowSteps
              steps={[
                { kicker: 'Problem', title: 'Where it breaks', detail: 'For whom, and at which moment' },
                { kicker: 'Insight', title: 'The unfair advantage', detail: 'What we hold that others cannot' },
                { kicker: 'Concept', title: 'Smallest product', detail: 'That puts the insight to work' },
                { kicker: 'Prototype', title: 'Clickable and honest', detail: 'Real where it counts, labelled where not', accent: true },
                { kicker: 'Case', title: 'Business case', detail: 'Levers, risks, a phased roadmap' },
                { kicker: 'Pitch', title: 'Story and IP', detail: 'The mechanism worth protecting' },
              ]}
            />
          </Figure>
          <Ledger
            rows={[
              { k: '2026', v: <><strong className="text-ink">DeviceFlex</strong> · AT&amp;T Sprint-a-thon · invention disclosure submitted (this case study)</> },
              { k: '2026', v: <><strong className="text-ink">AT&amp;T Helios: Zero Friction Convergence</strong> · AT&amp;T Innovation Jam · Best in Show / All Around</> },
              { k: '2025', v: <><strong className="text-ink">Hyper-personalized international travel</strong> · AT&amp;T Hackathon · 1st Place</> },
              { k: '2025', v: <><strong className="text-ink">Equitech Hackathon</strong> · Most Impactful Business Solution</> },
            ]}
          />
        </>
      ),
    },
    {
      id: 'problem',
      title: 'Problem',
      body: (
        <div className="prose-case">
          <p>
            <strong>Device protection is the one product customers pay for every month and hope never to use.</strong>{' '}
            Carriers resell substantially the same insurer-administered product on substantially the same terms, so it
            competes on price. Competing on experience has barely been tried.
          </p>
          <p>Where it breaks, from the member&rsquo;s side:</p>
          <ul>
            <li><strong>The deductible is a surprise.</strong> The most important number in the product is the one customers learn last, at the counter or midway through a claim.</li>
            <li><strong>Loss claims run on trust alone.</strong> An administrator that doesn&rsquo;t operate a network can&rsquo;t check whether a phone really went dark. It believes the customer or asks for an affidavit.</li>
            <li><strong>Coverage is bound to a handset.</strong> The policy names a device, and the backup belongs to whichever cloud account the customer set up months earlier.</li>
            <li><strong>Nothing happens between claims.</strong> There is no reason to open the product in the months when nothing breaks.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'insight',
      title: 'Insight',
      body: (
        <>
          <PullQuote>The carrier already holds evidence no insurer can see.</PullQuote>
          <div className="prose-case">
            <p>
              AT&amp;T runs the network. For every line it already knows when a device last reached a tower, whether it went
              dark abruptly or wound down, and whether the SIM has since appeared in a different handset. An administrator
              without a network has no equivalent and no path to one.
            </p>
            <p>That is a structural advantage, not a head start, and it reframes the product: a claim can be corroborated by the network instead of taken on trust.</p>
          </div>
        </>
      ),
    },
    {
      id: 'concept',
      title: 'Concept',
      body: (
        <div className="prose-case">
          <p>
            DeviceFlex turns protection into a membership that does something every month, and rebuilds the claim around
            signals only the operator holds. It is <strong>not a competing product</strong>: it layers onto the protection
            program AT&amp;T already runs, inside the existing myAT&amp;T experience, with no separate app and no new brand.
          </p>
          <ul>
            <li>A tiered membership (Basic, Plus, Family) offered at the add-ons step of a normal purchase, with deductibles visible before a plan is chosen.</li>
            <li>A household Protection Score that sets fraud-review sensitivity, inspection needs and whether a spare is pre-positioned.</li>
            <li>A Data Vault, so data continuity is guaranteed even when a spare handset isn&rsquo;t.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'vision',
      title: 'Product vision',
      body: (
        <>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { t: 'Know the cost first', d: 'The deductible and the resolution are visible before you commit.' },
              { t: 'Let the network back your story', d: 'Carrier signals corroborate loss and theft, so honest members move faster.' },
              { t: 'Your data follows your number', d: 'Coverage and restore are keyed to the line, not the handset.' },
            ].map((v) => (
              <div key={v.t} className="node p-5">
                <p className="font-semibold text-ink" style={{ fontStretch: '104%' }}>{v.t}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{v.d}</p>
              </div>
            ))}
          </div>
          <div className="prose-case mt-8">
            <p>
              Three audiences benefit. <strong>Covered households</strong> know the cost and the outcome before committing.{' '}
              <strong>Store associates and technicians</strong> receive a claim that is already verified, priced and routed
              to a store with stock. <strong>The insurer and its underwriter</strong> receive a complete, corroborated,
              auditable claim instead of an affidavit and a phone call.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'journey',
      title: 'User journey',
      body: (
        <Steps
          items={[
            { title: 'Discover', text: 'Protection appears as a tiered membership at the add-ons step of a normal purchase, with deductibles shown before a plan is chosen.' },
            { title: 'Enrol', text: 'Two doors: the 30-day new-device window or open enrollment. Every device presents a verified condition check before coverage starts.' },
            { title: 'Live with it', text: 'A household Protection Score drives fraud sensitivity, inspection needs and pre-positioned spares.' },
            { title: 'Claim', text: 'Photos for damage, an incident report for loss or theft, diagnostics for malfunctions. Six checks run in view.' },
            { title: 'Consent', text: 'Suspending a line and blocklisting a device is a separate, explicit step, refused outright when the network contradicts the report.' },
            { title: 'Resolve', text: 'An advisor ranks repair, home repair, swap, ship and upgrade on cost, time and data.' },
            { title: 'Restore', text: "The replacement is provisioned from the line's manifest. The broken device takes part in nothing." },
          ]}
        />
      ),
    },
    {
      id: 'ai',
      title: 'AI opportunity',
      body: (
        <>
          <PullQuote>AI perceives. Deterministic functions decide.</PullQuote>
          <div className="prose-case">
            <p>
              The obvious design wires a vision model&rsquo;s confidence straight into approve or deny. DeviceFlex does the
              opposite. Models are confined to <strong>perception</strong>: turning messy input, like a photo of a cracked
              screen or a disconnection pattern, into structured facts. Every consequential decision (approve, price, route,
              blocklist) is made by a <strong>pure, replayable function</strong> over those facts and the account state.
            </p>
            <p>
              That split is the governance model. A model cannot approve, deny or price anything; it can only describe what it
              observed. The constraint is architectural rather than procedural, so it holds under pressure and can be
              demonstrated instead of attested.
            </p>
          </div>
          <Figure n="3.2" title="Perception and decision are separate layers">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="node p-5">
                <p className="t-label">Perception</p>
                <p className="mt-2 font-semibold text-ink">Probabilistic</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">Messy input to structured facts: vision model, LLM, anomaly detection.</p>
                <p className="mt-4 border-t border-line pt-3 font-mono text-[0.8125rem] text-ink-3">severity: moderate · confidence: 0.82</p>
              </div>
              <div className="node node-accent p-5">
                <p className="t-label text-accent">Decision</p>
                <p className="mt-2 font-semibold text-ink">Pure function, replayable</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">Structured facts to a verdict and a resolution. Same input, same output, recorded with digests.</p>
                <p className="mt-4 border-t border-line pt-3 font-mono text-[0.8125rem] text-ink-3">approve → home repair → $0</p>
              </div>
            </div>
          </Figure>
        </>
      ),
    },
    {
      id: 'architecture',
      title: 'Architecture',
      body: (
        <>
          <div className="prose-case">
            <p>The same insurer sits at the end of the path. DeviceFlex changes what reaches its intake, not who receives it.</p>
          </div>
          <Figure n="3.3" title="DeviceFlex decision architecture">
            <LayerStack
              layers={[
                { name: 'Source systems', role: 'Inputs', nodes: [{ label: 'Handset camera' }, { label: 'Claim intake' }, { label: 'On-device inspection' }, { label: 'Carrier network', accent: true }, { label: 'Account and billing', accent: true }], note: 'Carrier network and account data are inputs only an operator holds.' },
                { name: 'Perception', role: 'Probabilistic', nodes: [{ label: 'Damage assessment' }, { label: 'Disconnect analysis' }, { label: 'Coverage assistant' }], note: 'Models turn messy input into structured facts, and nothing else.' },
                { name: 'Fact contract', role: 'Schema-validated', nodes: [{ label: 'Enumerated severity' }, { label: 'Boolean flags' }, { label: 'Integer scores' }, { label: 'Timestamps' }, { label: 'Digests' }], note: 'Model output is validated at the boundary; a malformed response falls back to the deterministic path.' },
                { name: 'Decision engine', role: 'Pure functions', nodes: [{ label: 'Claim corroboration', accent: true }, { label: 'Underwriting gate' }, { label: 'Resolution optimizer' }, { label: 'Protection posture' }], note: 'Every verdict is a pure function of facts and account state, with time passed in rather than read from the clock.' },
                { name: 'Ledger', role: 'Replayable', nodes: [{ label: 'Input digest' }, { label: 'Output digest' }, { label: 'Replay' }], note: 'Each decision is recorded with digests of its input and output, so it can be re-run and compared.' },
                { name: 'Effects', role: 'Actions', nodes: [{ label: 'Insurer intake' }, { label: 'Blocklist and suspension, with consent' }, { label: 'Fulfilment pre-staging' }, { label: 'Line-anchored provisioning' }], note: 'One payload shape reaches the insurer, whatever the claim type.' },
              ]}
              rail={{
                title: 'Closed loop',
                items: ['Every state change re-runs reconciliation', 'The Protection Score is recomputed', 'Line manifests are rebuilt', 'The score sets fraud sensitivity and pre-staging'],
                note: 'The score is a thermostat, not a thermometer: its output changes how the system behaves.',
              }}
            />
          </Figure>
          <SubHead>Five mechanisms</SubHead>
          <div className="prose-case">
            <p>The protectable core is the mechanism, not the membership. Pricing tiers are an economic practice; these are technical improvements to how the system works.</p>
          </div>
          <Steps
            items={[
              { title: 'Network-corroborated claims', text: 'Carrier telemetry (last seen on network, disconnection pattern, SIM and device status) corroborates or contradicts a loss or theft report before a person reviews it.' },
              { title: 'Line-anchored restore', text: 'Coverage and a restore manifest are keyed to the subscriber line, with handsets as pointers, so a replacement is provisioned from the line.' },
              { title: 'Replayable decision ledger', text: 'Every automated decision can be re-executed from its recorded input and verified against its recorded output.' },
              { title: 'Pre-staging optimizer', text: 'A device-health index that, past a threshold, pre-positions a matching replacement at the nearest capable store.' },
              { title: 'Attested enrolment', text: 'Enrolment requires a recent, verified condition attestation from the device, enforced where state changes rather than in the interface.' },
            ]}
          />
        </>
      ),
    },
    {
      id: 'decisions',
      title: 'Key decisions',
      body: (
        <Decisions
          items={[
            {
              decision: 'Cut the loaner phone and gadget library',
              why: "A loaner's availability can't be guaranteed, and a product shouldn't promise what it can't control. The Data Vault guarantees data continuity instead.",
              tradeoff: 'A perk that sounds good went away; the concept got tighter and more defensible.',
            },
            {
              decision: 'Refuse to blocklist on disputed evidence',
              why: 'A blocklisted device stops working on every US carrier. When the network contradicts a report, the claim goes to a specialist instead.',
              tradeoff: 'Slower resolution for contradicted claims, in exchange for never stranding a working device.',
            },
            {
              decision: 'Degrade to deterministic, never to a spinner',
              why: 'Every dependency has a defined fallback: no vision model means the on-device assessment; no telemetry means "inconclusive", never a fabricated pass.',
              tradeoff: 'Lower-fidelity answers during outages, stated plainly in the interface.',
            },
            {
              decision: 'Enforce gates where state changes, not in the UI',
              why: 'A control a screen can route around is only a suggestion, so enrolment without a valid attestation is dropped in the state layer.',
              tradeoff: 'More discipline in the core, less room for quick interface workarounds.',
            },
            {
              decision: 'Label what is real, seeded and absent',
              why: 'A prototype that overstates itself is worse than one that admits its edges.',
              tradeoff: 'A less magical demo, and a more credible one.',
            },
          ]}
        />
      ),
    },
    {
      id: 'value',
      title: 'Business value',
      body: (
        <>
          <div className="prose-case">
            <p>The levers, without internal figures:</p>
            <ul>
              <li><strong>Attach.</strong> Answering the deductible question up front narrows the gap between online and in-store attach.</li>
              <li><strong>Revenue per account.</strong> A tier ladder, with the Family tier growing revenue per household faster than per device.</li>
              <li><strong>Claims cost.</strong> Network corroboration gates loss and theft fraud before a person reviews it.</li>
              <li><strong>Replacement time.</strong> Pre-staging and line-anchored provisioning are designed for a roughly 15-minute in-store swap instead of a shipped replacement.</li>
              <li><strong>Retention.</strong> A shared household pool and vault create switching costs.</li>
              <li><strong>Cost to serve.</strong> Inference scales with claims, not traffic: dashboards, scores and eligibility checks are pure functions over state the system already holds.</li>
            </ul>
          </div>
          <div className="mt-6">
            <Todo>Add the business-case figures you are cleared to share publicly (attach, ARPU, time-to-replace targets).</Todo>
          </div>
        </>
      ),
    },
    {
      id: 'prototype',
      title: 'Prototype and demo',
      body: (
        <>
          <div className="prose-case">
            <p>
              A working, deployed prototype, built solo between 19 August and 5 September 2026: 17 routes covering the purchase
              flow, enrolment, claims, replacement, the vault, the household pool, and an impact screen where any decision can
              be replayed live. All five mechanisms run in it. The interface mirrors the existing myAT&amp;T experience because
              the product is designed to live inside it.
            </p>
          </div>
          <VideoEmbed demoId="deviceflex" location="case_study" />
          <SubHead>What is real, seeded and absent</SubHead>
          <Ledger
            rows={[
              { k: 'Real', v: 'The full journey across every route; the vision-model call with schema validation and fallback; the decision ledger with verified replay; the consent gate; the attestation gate in the state layer.' },
              { k: 'Seeded', v: 'Carrier telemetry for eight demo devices, one of which deliberately contradicts its loss report; fixed store inventory so answers are reproducible.' },
              { k: 'Stand-in', v: 'Signatures and tokens are digests over canonical JSON, not credentials. A deployment would sign in the device secure element and a hardware security module.' },
              { k: 'Absent', v: 'Payment and real authentication, deliberately.' },
            ]}
          />
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.9375rem] text-ink-3">
            <ArrowAnchor href={DEVICEFLEX_REPO}>DeviceFlex source on GitHub</ArrowAnchor>
            <span>TanStack Start · React 19 · TypeScript · Tailwind · Zod · OpenAI-compatible vision model</span>
          </p>
        </>
      ),
    },
    {
      id: 'scale',
      title: 'Why it can scale',
      body: (
        <>
          <div className="prose-case">
            <ul>
              <li><strong>No acquisition problem.</strong> The audience is already inside myAT&amp;T.</li>
              <li>
                <strong>An evidence-first rollout.</strong> Deductible transparency ships first as a standalone change. Network
                corroboration then runs in shadow mode, logged but not enforced, until its agreement with manual review is proven.
              </li>
              <li><strong>A platform, not a feature.</strong> Corroboration and attestation are general capabilities that fraud, care and retail teams can all use.</li>
              <li><strong>A portable build.</strong> The same build targets Vercel, Cloudflare Workers or Node, and the vision provider is three environment variables.</li>
            </ul>
          </div>
          <Figure n="3.4" title="Phased roadmap">
            <FlowSteps
              steps={[
                { kicker: 'Now', title: 'Prototype', detail: 'Five mechanisms deployed; invention disclosure submitted' },
                { kicker: '0–3 months', title: 'Deductible transparency', detail: 'Shipped into the live claim flow on its own' },
                { kicker: '3–6 months', title: 'Shadow-mode corroboration', detail: 'Decisions logged, not enforced', accent: true },
                { kicker: '6–9 months', title: 'Line manifest and attestation', detail: 'One device family first' },
                { kicker: '9–15 months', title: 'Pre-staging pilot', detail: 'One metro; tiers replace the flat charge' },
              ]}
            />
          </Figure>
          <div className="prose-case">
            <p>
              <strong>Honest risks.</strong> Rules on customer network data (CPNI) are the long pole, and shadow mode exists to
              build that case with evidence. Corroboration can be wrong, because a phone in a drawer looks like a lost phone,
              which is why the system flags rather than refuses. Pre-staging ties up inventory, so the threshold starts
              conservative.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'more-innovation',
      title: 'Other innovation work',
      body: (
        <>
          <SubHead>AT&amp;T Helios: Zero Friction Convergence</SubHead>
          <p className="t-label">AT&amp;T Innovation Jam 2026 · Best in Show / All Around</p>
          <div className="prose-case mt-4">
            <p>
              Buying a converged bundle of mobile, fiber and accessories meant navigating several disconnected flows, with
              trade-in, bring-your-own-device and eligibility checks each in their own silo. Helios proposed an AI-fueled single
              cart that assembles devices, plans, fiber and trade-in in one guided flow, with real-time eligibility and bundle
              recommendations inline.
            </p>
          </div>
          <SubHead>Hyper-personalized international travel</SubHead>
          <p className="t-label">AT&amp;T Hackathon 2025 · 1st Place</p>
          <div className="prose-case mt-4">
            <p>
              International roaming activation was confusing and reactive: customers found the right plan too late, which meant
              bill shock and support contacts. The concept used predictive models over travel patterns and media preferences to
              recommend the right plan in advance, with plan comparison, coverage checks and self-serve troubleshooting.
            </p>
          </div>
          <SubHead>Equitech Hackathon</SubHead>
          <p className="t-label">2025 · Most Impactful Business Solution</p>
          <div className="prose-case mt-4">
            <p>Recognized as the most impactful business solution of the event.</p>
          </div>
          <div className="mt-6 grid gap-3">
            <Todo>Describe the Equitech concept: the problem, the idea and why it won.</Todo>
            <Todo>Add Helios visuals or prototype details you are cleared to share.</Todo>
          </div>
        </>
      ),
    },
    {
      id: 'learned',
      title: 'What I learned',
      body: (
        <div className="prose-case">
          <ul>
            <li>
              <strong>Protect the mechanism, not the business model.</strong> A tiered membership is an economic practice anyone
              can copy. Network corroboration, line-anchored restore and a replayable ledger are technical, and hard to replicate
              without a network.
            </li>
            <li><strong>Cutting a feature can strengthen a product.</strong> Removing the loaner made the promise smaller, fully deliverable and more defensible.</li>
            <li>
              <strong>A verifier that always agrees verifies nothing.</strong> The demo includes a device whose telemetry
              contradicts its loss report, because the system has to be seen disagreeing.
            </li>
            <li><strong>Show the loop.</strong> A feedback loop nobody can see isn&rsquo;t a demo, so the score&rsquo;s effect on fraud sensitivity is visible in the interface.</li>
          </ul>
        </div>
      ),
    },
  ],
};

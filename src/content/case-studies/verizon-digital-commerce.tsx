import { BeforeAfter } from '../../components/case-study/BeforeAfter';
import { PullQuote } from '../../components/case-study/Blocks';
import type { CaseStudyContent } from '../../components/case-study/CaseLayout';
import { Decisions } from '../../components/case-study/Decisions';
import { Figure } from '../../components/diagrams/Figure';
import { FlowSteps } from '../../components/diagrams/FlowSteps';
import { MetricColumns } from '../../components/diagrams/MetricColumns';
import { Todo } from '../../components/ui/Todo';

export const verizonDigitalCommerce: CaseStudyContent = {
  slug: 'verizon-digital-commerce',
  number: '02',
  lede: (
    <>
      <p>
        This case study is about conventional product management: finding where a commerce journey leaks value, testing
        what might fix it, and shipping what the evidence supports.
      </p>
      <p>
        At Verizon I turned funnel analysis, A/B tests and customer research into requirements for <strong>15+ features</strong>{' '}
        across retail, consumer and B2B, and the work contributed <strong>$1.5M+ in incremental revenue in FY21</strong>.
      </p>
    </>
  ),
  facts: [
    { key: 'Role', value: 'Consultant, Digital & Assisted Sales' },
    { key: 'Org', value: 'Verizon Consumer Group' },
    { key: 'Period', value: 'Mar 2020 – Aug 2022' },
    { key: 'Scope', value: 'Retail, consumer and B2B lines of business' },
    { key: 'Team', value: '8–12 stakeholders across 4 concurrent workstreams' },
    { key: 'Method', value: 'Funnel analysis · A/B testing · research · SAFe' },
  ],
  keyMetrics: [
    { value: '$1.5M+', label: 'Incremental revenue, FY21' },
    { value: '15+', label: 'Features specified from research' },
    { value: '94%', label: 'On-time delivery' },
    { value: '<4%', label: 'Sprint spillover' },
  ],
  sections: [
    {
      id: 'context',
      title: 'Context',
      body: (
        <div className="prose-case">
          <p>
            Verizon sells through the web, retail stores and assisted channels, across consumer, retail and B2B lines of
            business. From 2020 to 2022 I worked in the Verizon Consumer Group&rsquo;s digital and assisted sales team,
            turning customer analytics and experiments into product requirements and shipped changes.
          </p>
          <p>The period included the shift to contactless delivery during COVID, which changed what customers needed from fulfillment.</p>
        </div>
      ),
    },
    {
      id: 'problem',
      title: 'Problem',
      body: (
        <div className="prose-case">
          <p>Commerce journeys leaked value at specific points, and each leak had its own cause:</p>
          <ul>
            <li>Carts fragmented across retail, web and assisted channels led to abandonment and inconsistent fulfillment.</li>
            <li>Early termination fees drove confusion and service inquiries.</li>
            <li>Contactless delivery during COVID made delivery speed part of the product.</li>
            <li>Upgrade and add-on revenue depended on offers that fit how customers wanted to pay.</li>
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
            Each leak mapped to a commercial lever that could be measured: fulfillment and abandonment, service-inquiry
            volume, delivery time and satisfaction, upgrade rate, and add-on attach. That made it possible to prioritize by
            expected impact and to prove results with the same metrics that justified the work.
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
            In commerce, the product is the path to purchase. Find where the funnel leaks, test the smallest change that
            could fix it, and ship what the evidence supports.
          </PullQuote>
          <div className="prose-case">
            <p>The discipline is in the order: evidence first, then requirements, then delivery.</p>
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
            <p>
              Customers buy on the web, in stores and with assisted sales; store and care representatives work the same
              journeys from the other side; and each line of business owns its own numbers. The five changes below landed at
              different stages of that journey.
            </p>
          </div>
          <Figure n="2.1" title="Where each change landed in the purchase journey">
            <FlowSteps
              steps={[
                { kicker: 'Configure', title: 'Plan and financing', detail: 'Three-year device payment plans; the Hum+ Wi-Fi add-on', metric: '+14% upgrade rate' },
                { kicker: 'Cart', title: 'One cart, every channel', detail: 'Omni Universal Cart across retail, web and assisted', metric: '−13% cart abandonment', accent: true },
                { kicker: 'Fulfill', title: 'Split fulfillment', detail: 'Available items ship first, contactless', metric: '2.1 days faster' },
                { kicker: 'Support', title: 'Early termination fees', detail: 'Redesigned from customer insight', metric: '−22% service inquiries' },
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
          <ul>
            <li><strong>Analysis.</strong> Funnel analysis, A/B testing and market research across three lines of business.</li>
            <li><strong>Requirements.</strong> BRDs and PRDs for 15+ features in Verizon&rsquo;s digital ecosystem.</li>
            <li><strong>Cross-functional delivery</strong> with UX, data science and product teams, at 94% on-time delivery.</li>
            <li>
              <strong>Coordination</strong> of 8–12 stakeholders, including Scrum Masters, release train engineers and
              engineering, in SAFe; ceremonies for four concurrent workstreams with sprint spillover under 4%.
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
            <p>Five changes, each answering a specific signal and accountable for one result.</p>
          </div>
          <Decisions
            labels={['Change', 'Signal it answered', 'Result']}
            items={[
              {
                decision: 'Omni Universal Cart',
                why: 'Carts fragmented across retail, web and assisted channels caused abandonment and inconsistent fulfillment.',
                tradeoff: '11% order fulfillment growth and 13% less cart abandonment.',
              },
              {
                decision: 'Three-year device payment plans',
                why: 'Upgrades hinge on the monthly cost, and a longer term lowers it. Piloted before any wider rollout.',
                tradeoff: '$320K in pilot revenue and a 14% higher upgrade rate.',
              },
              {
                decision: 'Early termination fee redesign',
                why: 'Customer-insight analysis pointed to early termination fees as a driver of service inquiries.',
                tradeoff: '22% fewer service inquiries.',
              },
              {
                decision: 'Hum+ Wi-Fi plan',
                why: 'A new add-on needed positioning and a digital sales flow that would attach at scale.',
                tradeoff: '$100K+ ARR at a 23% attach rate.',
              },
              {
                decision: 'Split fulfillment',
                why: 'With contactless delivery during COVID, speed and reliability became part of the product.',
                tradeoff: 'Delivery 2.1 days faster and CSAT up 3 points.',
              },
            ]}
          />
        </>
      ),
    },
    {
      id: 'solution',
      title: 'Solution',
      body: (
        <div className="prose-case">
          <p>
            Five shipped changes across configuration, cart, fulfillment and support, each tied to one metric. Together with
            the wider feature work, the program contributed $1.5M+ in incremental revenue in FY21.
          </p>
        </div>
      ),
    },
    {
      id: 'system',
      title: 'Experimentation system',
      body: (
        <>
          <div className="prose-case">
            <p>The technical core of this work was the evidence loop: how an observation became a tested change and then a shipped feature.</p>
          </div>
          <Figure n="2.2" title="From evidence to release">
            <FlowSteps
              steps={[
                { kicker: 'Observe', title: 'Funnel analysis', detail: 'Where customers drop, by channel and line of business' },
                { kicker: 'Understand', title: 'Research', detail: 'Customer insight and market research' },
                { kicker: 'Test', title: 'A/B experiments', detail: 'The smallest change that could move the metric', accent: true },
                { kicker: 'Specify', title: 'BRD / PRD', detail: 'Requirements for 15+ features' },
                { kicker: 'Ship', title: 'Delivery', detail: 'UX, data science, product and engineering', metric: '94% on-time' },
              ]}
            />
          </Figure>
        </>
      ),
    },
    {
      id: 'delivery',
      title: 'Delivery and execution',
      body: (
        <div className="prose-case">
          <p>
            Delivery ran in SAFe across four concurrent workstreams. I coordinated 8–12 stakeholders, facilitated the Agile
            ceremonies, and kept sprint spillover under 4% with 94% of commitments delivered on time.
          </p>
        </div>
      ),
    },
    {
      id: 'metrics',
      title: 'Metrics',
      body: (
        <Figure n="2.3" title="Results by type">
          <MetricColumns
            connected={false}
            columns={[
              {
                title: 'Revenue',
                caption: 'Commercial outcomes',
                items: [{ value: '$1.5M+', label: 'Incremental revenue, FY21' }, { value: '$320K', label: 'Pilot revenue, 3-year plans' }, { value: '$100K+', label: 'ARR, Hum+ Wi-Fi' }],
              },
              {
                title: 'Conversion',
                caption: 'Funnel metrics',
                accent: true,
                items: [{ value: '+11%', label: 'Order fulfillment' }, { value: '−13%', label: 'Cart abandonment' }, { value: '+14%', label: 'Upgrade rate' }, { value: '23%', label: 'Add-on attach' }],
              },
              {
                title: 'Experience',
                caption: 'Service and satisfaction',
                items: [{ value: '−22%', label: 'Service inquiries' }, { value: '−2.1d', label: 'Delivery time' }, { value: '+3', label: 'CSAT points' }],
              },
            ]}
          />
        </Figure>
      ),
    },
    {
      id: 'impact',
      title: 'Business impact',
      body: (
        <div className="prose-case">
          <ul>
            <li><strong>$1.5M+ incremental revenue</strong> in FY21.</li>
            <li><strong>$320K pilot revenue</strong> from three-year device payment plans, with a 14% higher upgrade rate.</li>
            <li><strong>$100K+ ARR</strong> from the Hum+ Wi-Fi add-on at a 23% attach rate.</li>
            <li><strong>Verizon Spotlight Award for Customer Excellence (2021)</strong>, from Verizon&rsquo;s GTS team.</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'changed',
      title: 'What changed',
      body: (
        <BeforeAfter
          rows={[
            { area: 'Cart', before: 'Separate carts across retail, web and assisted channels', after: 'One cart across channels: 11% more orders fulfilled' },
            { area: 'Financing', before: 'Shorter device payment terms only', after: 'A three-year option, piloted first: 14% more upgrades' },
            { area: 'Fees', before: 'Early termination fees drove service inquiries', after: 'A redesigned fee experience: 22% fewer inquiries' },
            { area: 'Fulfillment', before: 'Orders waited for every item', after: 'Available items ship first, contactless: 2.1 days faster' },
            { area: 'Add-ons', before: 'A new add-on without a proven sales motion', after: 'A digital attach flow: 23% attach, $100K+ ARR' },
          ]}
        />
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
                <strong>Pilot before you scale.</strong> The three-year payment plan proved $320K and a 14% upgrade lift before
                asking for a bigger commitment.
              </li>
              <li>
                <strong>Support volume is product feedback.</strong> The fee redesign came from customer insight, and service
                inquiries fell 22%.
              </li>
              <li>
                <strong>Operational constraints can become product opportunities.</strong> Contactless delivery during COVID
                became split fulfillment, 2.1 days faster.
              </li>
              <li><strong>Give every change one metric.</strong> Each of the five was accountable for a single number.</li>
            </ul>
          </div>
          <div className="mt-6">
            <Todo>Add an experiment that failed or surprised you, and what you did next.</Todo>
          </div>
        </>
      ),
    },
  ],
};

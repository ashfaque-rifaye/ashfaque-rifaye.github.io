import { PageHeader } from '../components/layout/PageHeader';
import { ArrowLink, ButtonLink } from '../components/ui/Links';

export function NotFoundPage() {
  return (
    <div className="pb-[var(--section)]">
      <PageHeader
        title="This page doesn't exist"
        lede="The link may be old, or the page may have moved during the redesign. The work, the AI Lab and the résumé are one click away."
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink to="/">Go to the homepage</ButtonLink>
          <ArrowLink to="/work/">See the work</ArrowLink>
          <ArrowLink to="/lab/">Visit the AI Lab</ArrowLink>
          <ArrowLink to="/contact/">Get in touch</ArrowLink>
        </div>
      </PageHeader>
    </div>
  );
}

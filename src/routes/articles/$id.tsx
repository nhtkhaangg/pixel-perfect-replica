import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { ARTICLE_IMAGES, ArticleTile } from "@/components/public/ArticleTile";
import { Container, InitialsAvatar, SectionHeading } from "@/components/public/blocks";
import { Breadcrumbs } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/format";
import { ARTICLES, TRAINERS } from "@/lib/mock/public";

export const Route = createFileRoute("/articles/$id")({
  loader: ({ params }) => {
    const index = ARTICLES.findIndex((a) => a.id === params.id);
    if (index < 0) throw notFound();
    return { article: ARTICLES[index]!, index };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Không tìm thấy bài viết — GymCore" }, { name: "robots", content: "noindex" }] };
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — GymCore` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <PublicLayout>
      <Container className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Không tìm thấy bài viết</h1>
        <Button className="mt-6" asChild><Link to="/articles">Xem bài viết khác</Link></Button>
      </Container>
    </PublicLayout>
  ),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article, index } = Route.useLoaderData();
  const author = TRAINERS.find((t) => t.name === article.author);
  const related = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);
  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
        <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Kiến thức", to: "/articles" }, { label: article.category }]} />
        <p className="mt-6 text-xs font-semibold tracking-wider text-primary uppercase">{article.category}</p>
        <h1 className="mt-2 font-display text-3xl leading-tight font-extrabold md:text-5xl">{article.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <InitialsAvatar name={article.author} className="size-9 text-xs" />
          <span className="text-foreground">{article.author}</span> · {formatDate(article.publishedAt)} · <Clock size={14} /> {article.readMinutes} phút đọc
        </div>
        <img src={ARTICLE_IMAGES[index % 3]} alt={article.title} width={1200} height={912} className="mt-8 aspect-[16/9] w-full rounded-xl border border-border object-cover" />
        <p className="mt-8 text-lg leading-relaxed">{article.excerpt}</p>
        {article.content.map((s) => (
          <section key={s.heading} className="mt-8">
            <h2 className="font-display text-2xl font-bold">{s.heading}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
        {author ? (
          <div className="card-surface mt-12 flex flex-wrap items-center gap-4 p-5">
            <InitialsAvatar name={author.name} />
            <div className="flex-1">
              <p className="font-semibold">{author.name}</p>
              <p className="text-sm text-muted-foreground">Huấn luyện viên {author.specialty}</p>
            </div>
            <Button variant="outline" asChild><Link to="/trainers/$id" params={{ id: author.id }}>Xem hồ sơ</Link></Button>
          </div>
        ) : null}
      </article>
      <Container className="pb-16">
        <SectionHeading title="Bài viết liên quan" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((a) => <ArticleTile key={a.id} article={a} index={ARTICLES.indexOf(a)} />)}</div>
      </Container>
    </PublicLayout>
  );
}

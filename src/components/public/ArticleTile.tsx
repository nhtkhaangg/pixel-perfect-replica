import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";

import gymInterior from "@/assets/gym-interior.jpg";
import heroImage from "@/assets/hero-gym.jpg";
import training from "@/assets/training.jpg";
import { formatDate } from "@/lib/format";
import type { Article } from "@/lib/mock/public";

export const ARTICLE_IMAGES = [training, gymInterior, heroImage];

export function ArticleTile({ article, index }: { article: Article; index: number }) {
  return (
    <Link to="/articles/$id" params={{ id: article.id }} className="card-surface group flex flex-col overflow-hidden transition-colors hover:border-primary/40">
      <img src={ARTICLE_IMAGES[index % 3]} alt="" loading="lazy" width={1200} height={912} className="aspect-[16/9] w-full object-cover opacity-85 transition-opacity group-hover:opacity-100" />
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-wider text-primary uppercase">{article.category}</p>
        <h3 className="mt-2 font-display text-lg leading-snug font-bold group-hover:text-primary">{article.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{article.excerpt}</p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          {formatDate(article.publishedAt)} · <Clock size={12} /> {article.readMinutes} phút đọc
        </p>
      </div>
    </Link>
  );
}

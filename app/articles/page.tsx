import { Article } from '@/types';
import { db } from '@/db';
import { articlesSchema } from '@/db/schema';
import Articles from './Articles';

const ArticlesPage = async() => {
    const articles: Article[] = await db.select().from(articlesSchema).execute();

    return (
        <>
            <Articles articles={articles} />
        </>
    );
};

export default ArticlesPage;
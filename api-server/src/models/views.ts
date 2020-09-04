import sql from "src/utils/sql-template";

export const companyReviewStatistics = sql`
SELECT
    companyname AS name,
    count(*) AS numreviews,
    avg(nummonthsworked) AS avgnummonthsworked,
    avg(wouldrecommend::integer) AS percentrecommended,
    avg(healthandsafety) AS healthandsafety,
    avg(managerrelationship) AS managerrelationship,
    avg(workenvironment) AS workenvironment,
    avg(benefits) AS benefits,
    avg(overallsatisfaction) AS overallsatisfaction
FROM reviews
GROUP BY companyname
`;

export const reviewVoteCounts = sql`
select
    refersto as reviewid,
    count(*) filter (where value = true) as upvotes,
    count(*) filter (where value = false) as downvotes
from review_votes
group by refersto
`;

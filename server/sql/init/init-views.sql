-- company review statistics -> calculated on companies, from reviews
DROP VIEW IF EXISTS company_review_statistics CASCADE;
CREATE OR REPLACE VIEW company_review_statistics AS
select companyname as name,
count(companyname) as numreviews,
avg(nummonthsworked) as avgnummonthsworked,
avg(wouldrecommend::int) as percentrecommended,
avg(healthandsafety) as healthandsafety,
avg(managerrelationship) as managerrelationship,
avg(workenvironment) as workenvironment,
avg(benefits) as benefits,
avg(overallsatisfaction) overallsatisfaction
from reviews
group by companyname;

-- company salary statistics -> calculated on companies, from salaries
-- DROP VIEW IF EXISTS company_salary_statistics CASCADE;
-- CREATE OR REPLACE VIEW company_salary_statistics AS
-- select
-- for each job title
-- avg,max,min for males
-- avg,max,min for females
-- avg,max,min for all
-- group by company by job title


-- review upvotes and downvotes -> calculated on reviews, from votes
DROP VIEW IF EXISTS review_vote_statistics CASCADE;
CREATE OR REPLACE VIEW review_vote_statistics AS

select

	refersto,
	zero_if_null(upvotes) as upvotes,
	zero_if_null(downvotes) as downvotes

from

	(select refersto,count(value) as upvotes from review_votes
	group by refersto,value
	having value='t') as votes1

	NATURAL FULL OUTER JOIN

	(select refersto,count(value) as downvotes from review_votes
	group by refersto,value
	having value='f') as votes2;

-- comment upvotes and downvotes -> calculated on review_comments, from votes
DROP VIEW IF EXISTS comment_vote_statistics CASCADE;
CREATE OR REPLACE VIEW comment_vote_statistics AS

select

	refersto,
	zero_if_null(upvotes) as upvotes,
	zero_if_null(downvotes) as downvotes

from

	(select refersto,count(value) as upvotes from comment_votes
	group by refersto,value
	having value='t') as votes1

	NATURAL FULL OUTER JOIN

	(select refersto,count(value) as downvotes from comment_votes
	group by refersto,value
	having value='f') as votes2;

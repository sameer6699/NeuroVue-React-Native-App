--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (PGlite 0.2.0)
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = off;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET escape_string_warning = off;
SET row_security = off;

--
-- Name: meta; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA meta;


ALTER SCHEMA meta OWNER TO postgres;

--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA public;


--
-- Name: EXTENSION vector; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION vector IS 'vector data type and ivfflat and hnsw access methods';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: embeddings; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.embeddings (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    content text NOT NULL,
    embedding public.vector(384) NOT NULL
);


ALTER TABLE meta.embeddings OWNER TO postgres;

--
-- Name: embeddings_id_seq; Type: SEQUENCE; Schema: meta; Owner: postgres
--

ALTER TABLE meta.embeddings ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME meta.embeddings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: migrations; Type: TABLE; Schema: meta; Owner: postgres
--

CREATE TABLE meta.migrations (
    version text NOT NULL,
    name text,
    applied_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE meta.migrations OWNER TO postgres;

--
-- Name: ai_interactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_interactions (
    id uuid NOT NULL,
    user_id uuid,
    prompt_text text NOT NULL,
    ai_response text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.ai_interactions OWNER TO postgres;

--
-- Name: interview_analytics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview_analytics (
    id uuid NOT NULL,
    session_id uuid,
    total_questions integer NOT NULL,
    average_response_time numeric NOT NULL,
    strengths text,
    weaknesses text,
    improvement_suggestions text,
    behavior_analysis text,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.interview_analytics OWNER TO postgres;

--
-- Name: interview_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview_questions (
    id uuid NOT NULL,
    session_id uuid,
    question_text text NOT NULL,
    question_type text NOT NULL,
    asked_by text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now(),
    CONSTRAINT interview_questions_asked_by_check CHECK ((asked_by = ANY (ARRAY['AI'::text, 'user'::text]))),
    CONSTRAINT interview_questions_question_type_check CHECK ((question_type = ANY (ARRAY['technical'::text, 'behavioural'::text, 'system_design'::text, 'hr'::text])))
);


ALTER TABLE public.interview_questions OWNER TO postgres;

--
-- Name: interview_responses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview_responses (
    id uuid NOT NULL,
    question_id uuid,
    response_text text NOT NULL,
    response_by text NOT NULL,
    evaluation_score numeric,
    "timestamp" timestamp with time zone DEFAULT now(),
    CONSTRAINT interview_responses_response_by_check CHECK ((response_by = ANY (ARRAY['user'::text, 'AI'::text])))
);


ALTER TABLE public.interview_responses OWNER TO postgres;

--
-- Name: interview_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interview_sessions (
    id uuid NOT NULL,
    user_id uuid,
    session_type text NOT NULL,
    mode text NOT NULL,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone,
    overall_score numeric,
    feedback_summary text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT interview_sessions_mode_check CHECK ((mode = ANY (ARRAY['live'::text, 'mock'::text]))),
    CONSTRAINT interview_sessions_session_type_check CHECK ((session_type = ANY (ARRAY['technical'::text, 'behavioural'::text, 'system_design'::text, 'hr'::text])))
);


ALTER TABLE public.interview_sessions OWNER TO postgres;

--
-- Name: resume_evaluations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resume_evaluations (
    id uuid NOT NULL,
    resume_id uuid,
    summary text,
    strengths text,
    weaknesses text,
    evaluation_time timestamp with time zone DEFAULT now()
);


ALTER TABLE public.resume_evaluations OWNER TO postgres;

--
-- Name: resumes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.resumes (
    id uuid NOT NULL,
    user_id uuid,
    file_url text NOT NULL,
    upload_time timestamp with time zone DEFAULT now()
);


ALTER TABLE public.resumes OWNER TO postgres;

--
-- Name: user_analytics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_analytics (
    id uuid NOT NULL,
    user_id uuid,
    total_sessions integer,
    average_score numeric,
    sessions_by_type text,
    behavioral_insights text,
    system_design_progress text,
    hr_confidence_score numeric,
    last_active timestamp with time zone
);


ALTER TABLE public.user_analytics OWNER TO postgres;

--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profiles (
    user_id uuid NOT NULL,
    avatar_url text,
    bio text,
    resume_url text,
    preferred_language text,
    notification_settings text
);


ALTER TABLE public.user_profiles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    full_name text NOT NULL,
    email text NOT NULL,
    phone_number text,
    password_hash text,
    auth_provider text NOT NULL,
    job_role text,
    experience_level text NOT NULL,
    interview_focus_area text[],
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT users_auth_provider_check CHECK ((auth_provider = ANY (ARRAY['email'::text, 'google'::text, 'linkedin'::text]))),
    CONSTRAINT users_experience_level_check CHECK ((experience_level = ANY (ARRAY['fresher'::text, 'junior'::text, 'mid'::text, 'senior'::text, 'lead'::text])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: embeddings; Type: TABLE DATA; Schema: meta; Owner: postgres
--



--
-- Data for Name: migrations; Type: TABLE DATA; Schema: meta; Owner: postgres
--

INSERT INTO meta.migrations VALUES ('202407160001', 'embeddings', '2025-06-14 08:34:49.449+00');


--
-- Data for Name: ai_interactions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: interview_analytics; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: interview_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: interview_responses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: interview_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: resume_evaluations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: resumes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_analytics; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: embeddings_id_seq; Type: SEQUENCE SET; Schema: meta; Owner: postgres
--

SELECT pg_catalog.setval('meta.embeddings_id_seq', 1, false);


--
-- Name: embeddings embeddings_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.embeddings
    ADD CONSTRAINT embeddings_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: meta; Owner: postgres
--

ALTER TABLE ONLY meta.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (version);


--
-- Name: ai_interactions ai_interactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_interactions
    ADD CONSTRAINT ai_interactions_pkey PRIMARY KEY (id);


--
-- Name: interview_analytics interview_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_analytics
    ADD CONSTRAINT interview_analytics_pkey PRIMARY KEY (id);


--
-- Name: interview_questions interview_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_questions
    ADD CONSTRAINT interview_questions_pkey PRIMARY KEY (id);


--
-- Name: interview_responses interview_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_responses
    ADD CONSTRAINT interview_responses_pkey PRIMARY KEY (id);


--
-- Name: interview_sessions interview_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_sessions
    ADD CONSTRAINT interview_sessions_pkey PRIMARY KEY (id);


--
-- Name: resume_evaluations resume_evaluations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resume_evaluations
    ADD CONSTRAINT resume_evaluations_pkey PRIMARY KEY (id);


--
-- Name: resumes resumes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT resumes_pkey PRIMARY KEY (id);


--
-- Name: user_analytics user_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_analytics
    ADD CONSTRAINT user_analytics_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_ai_interactions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_ai_interactions_user_id ON public.ai_interactions USING btree (user_id);


--
-- Name: idx_interview_questions_session_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interview_questions_session_id ON public.interview_questions USING btree (session_id);


--
-- Name: idx_interview_responses_question_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interview_responses_question_id ON public.interview_responses USING btree (question_id);


--
-- Name: idx_interview_sessions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_interview_sessions_user_id ON public.interview_sessions USING btree (user_id);


--
-- Name: idx_user_analytics_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_analytics_user_id ON public.user_analytics USING btree (user_id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: ai_interactions ai_interactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_interactions
    ADD CONSTRAINT ai_interactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: interview_analytics interview_analytics_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_analytics
    ADD CONSTRAINT interview_analytics_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.interview_sessions(id) ON DELETE CASCADE;


--
-- Name: interview_questions interview_questions_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_questions
    ADD CONSTRAINT interview_questions_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.interview_sessions(id) ON DELETE CASCADE;


--
-- Name: interview_responses interview_responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_responses
    ADD CONSTRAINT interview_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.interview_questions(id) ON DELETE CASCADE;


--
-- Name: interview_sessions interview_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interview_sessions
    ADD CONSTRAINT interview_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: resume_evaluations resume_evaluations_resume_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resume_evaluations
    ADD CONSTRAINT resume_evaluations_resume_id_fkey FOREIGN KEY (resume_id) REFERENCES public.resumes(id) ON DELETE CASCADE;


--
-- Name: resumes resumes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.resumes
    ADD CONSTRAINT resumes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_analytics user_analytics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_analytics
    ADD CONSTRAINT user_analytics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


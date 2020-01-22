--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_fk0;
ALTER TABLE ONLY public.storages DROP CONSTRAINT storages_fk1;
ALTER TABLE ONLY public.storages DROP CONSTRAINT storages_fk0;
ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_fk1;
ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_fk0;
ALTER TABLE ONLY public.users DROP CONSTRAINT "users_userName_key";
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
ALTER TABLE ONLY public.storages DROP CONSTRAINT storages_pk;
ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pk;
ALTER TABLE ONLY public.addresses DROP CONSTRAINT addresses_pk;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.storages ALTER COLUMN "storageId" DROP DEFAULT;
ALTER TABLE public.messages ALTER COLUMN "messageId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."storages_storageId_seq";
DROP TABLE public.storages;
DROP SEQUENCE public."messages_messageId_seq";
DROP TABLE public.messages;
DROP TABLE public.addresses;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.addresses (
    "addressId" integer NOT NULL,
    street1 text NOT NULL,
    street2 text,
    city text NOT NULL,
    state text NOT NULL,
    zip integer NOT NULL,
    longitude double precision NOT NULL,
    latitude double precision NOT NULL
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    "messageId" integer NOT NULL,
    "fromId" integer NOT NULL,
    "toId" integer NOT NULL,
    message text NOT NULL,
    "messagedAt" timestamp without time zone DEFAULT '2020-01-22 20:24:24.107006'::timestamp without time zone NOT NULL
);


--
-- Name: messages_messageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."messages_messageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_messageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."messages_messageId_seq" OWNED BY public.messages."messageId";


--
-- Name: storages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.storages (
    "storageId" integer NOT NULL,
    width integer NOT NULL,
    depth integer NOT NULL,
    height integer NOT NULL,
    "storagePicturePath" text NOT NULL,
    "pricePerDay" integer NOT NULL,
    "maxValue" integer NOT NULL,
    title text NOT NULL,
    "longDescription" text NOT NULL,
    "addressId" integer NOT NULL,
    "hostId" integer NOT NULL,
    "isAvailable" boolean DEFAULT true NOT NULL
);


--
-- Name: storages_storageId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."storages_storageId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: storages_storageId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."storages_storageId_seq" OWNED BY public.storages."storageId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    "userName" text NOT NULL,
    password text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    "aboutMe" text NOT NULL,
    "profilePicturePath" text NOT NULL,
    "addressId" integer NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: messages messageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN "messageId" SET DEFAULT nextval('public."messages_messageId_seq"'::regclass);


--
-- Name: storages storageId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storages ALTER COLUMN "storageId" SET DEFAULT nextval('public."storages_storageId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.addresses ("addressId", street1, street2, city, state, zip, longitude, latitude) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages ("messageId", "fromId", "toId", message, "messagedAt") FROM stdin;
\.


--
-- Data for Name: storages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.storages ("storageId", width, depth, height, "storagePicturePath", "pricePerDay", "maxValue", title, "longDescription", "addressId", "hostId", "isAvailable") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", "userName", password, "firstName", "lastName", email, "aboutMe", "profilePicturePath", "addressId") FROM stdin;
\.


--
-- Name: messages_messageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."messages_messageId_seq"', 1, false);


--
-- Name: storages_storageId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."storages_storageId_seq"', 1, false);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 1, false);


--
-- Name: addresses addresses_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pk PRIMARY KEY ("addressId");


--
-- Name: messages messages_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pk PRIMARY KEY ("messageId");


--
-- Name: storages storages_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_pk PRIMARY KEY ("storageId");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY ("userId");


--
-- Name: users users_userName_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_userName_key" UNIQUE ("userName");


--
-- Name: messages messages_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_fk0 FOREIGN KEY ("fromId") REFERENCES public.users("userId");


--
-- Name: messages messages_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_fk1 FOREIGN KEY ("toId") REFERENCES public.users("userId");


--
-- Name: storages storages_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_fk0 FOREIGN KEY ("addressId") REFERENCES public.addresses("addressId");


--
-- Name: storages storages_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.storages
    ADD CONSTRAINT storages_fk1 FOREIGN KEY ("hostId") REFERENCES public.users("userId");


--
-- Name: users users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk0 FOREIGN KEY ("addressId") REFERENCES public.addresses("addressId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--


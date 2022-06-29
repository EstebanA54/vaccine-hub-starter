\echo 'Delete and recreate vaccine_hub db?'
\prompt 'Return for yes or control-C to cancel >' answer

drop database vaccine_hub;
create database vaccine_hub;
\connect vaccine_hub

\i vaccine-hub-schema.sql
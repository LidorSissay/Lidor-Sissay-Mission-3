FROM mysql:latest

# export from phpmyadmin a .sql file
# and reaplce ./betterx.sql with it
# then uncomment the following line
COPY ./meetings_db.sql /docker-entrypoint-initdb.d/

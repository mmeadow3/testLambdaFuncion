
# Define PostgreSQL connection parameters
$user = "postgres"
$localhost = "localhost"
# Define the path to psql if it's not in the PATH environment variable
$psqlPath = "C:\Program Files\PostgreSQL\17\bin\psql.exe" 

& $psqlPath -U $user -h $localhost

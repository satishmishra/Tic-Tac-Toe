# this is the dev environment
export PATH="./node_modules/.bin:$PATH"
export CLUSTER_MASTER_REPL="./tmp/cluster-master-repl"

exec "$@"

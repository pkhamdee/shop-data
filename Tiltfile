SOURCE_IMAGE = os.getenv("SOURCE_IMAGE", default='dev.local/tanzu-java-web-app-source')
LOCAL_PATH = os.getenv("LOCAL_PATH", default='.')
NAMESPACE = os.getenv("NAMESPACE", default='default')
OUTPUT_TO_NULL_COMMAND = os.getenv("OUTPUT_TO_NULL_COMMAND", default=' > /dev/null ')

local_resource(
    'build',
    'npm run build',
    deps=['./src'],
)

k8s_yaml('config/inner/resource.yaml')

k8s_custom_deploy(
    'shop-data',
    apply_cmd="tanzu apps workload apply -f config/inner/workload.yaml --update-strategy replace --debug --live-update" +
               " --local-path " + LOCAL_PATH +
               " --source-image " + SOURCE_IMAGE +
               " --namespace " + NAMESPACE +
               " --yes " +
               OUTPUT_TO_NULL_COMMAND +
               " && kubectl get workload shop-data --namespace " + NAMESPACE + " -o yaml",
    delete_cmd="tanzu apps workload delete -f config/inner/workload.yaml --namespace " + NAMESPACE + " --yes",
    deps=['./dist'],
    container_selector='workload',
    live_update=[
      sync('./dist', '/workspace/dist'), 
      run('echo `date` > /workspace/reload') # force an update in /workspace folder as this is the folder that watchexec is monitoring
    ]
)

k8s_resource('shop-data', port_forwards=["8080:8080"],
            extra_pod_selectors=[{'carto.run/workload-name': 'shop-data', 'app.kubernetes.io/component': 'run'}])

allow_k8s_contexts('tanzu-play-caa-wlc-tap-full-az-15-admin@tanzu-play-caa-wlc-tap-full-az-15')
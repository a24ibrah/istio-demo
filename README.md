# istio-demo
This contains files necessary to demo istio via GCP

## Installing Istio on Kubernetes Engine
Adapted from [Google Cloud instructions](https://cloud.google.com/kubernetes-engine/docs/tutorials/istio-on-gke).

### Before you begin
1. Create a GCP project
2. Enable Kubernetes APIs
3. Enable billing
4. Install [gcloud](https://cloud.google.com/sdk/docs/quickstart-linux)
5. Install kubectl:  `gcloud components install kubectl`

### Create a Kubernetes Engine cluster
Create cluster named `istio-demo`.
```bash
gcloud container clusters create istio-demo \
--machinetype=n1-standard-2 \
 --num-nodes=4 \
 --no-enable-legacy-authorization \
 --zone=us-central1-b
```
Give the current user admin permissions for the cluster.
```bash
kubectl create clusterrolebinding cluster-admin-binding \
--clusterrole=cluster-admin \
--user="$(gcloud config get-value core/account)"
```

### Install Istio
1. Download [Istio release](https://github.com/istio/istio/releases).
2. extract and navigate to your istio directory in a terminal.
2. Add istioctl to your PATH: `export PATH=$PWD/bin:$PATH`.
3. Istall Istio core components: `kubectl apply -f install/kubernetes/istio-auth.yaml`.

### Install Bookinfo Example
Deploy the bookinfo microservices in Istio.
```bash
kubectl apply -f <(istioctl kube-inject -f samples/bookinfo/kube/bookinfo.yaml)
```
Find out what the ingress IP is.
```bash
kubectl get ingress -o wide
```

### Add policies to Bookinfo
You may add any of the policies that are in the `policies` directory to the bookinfo example. They work best individually so remember to remove them when you are done.

General format to add rule:
```bash
istioctl create -f policies/{policy-file-name.yml}
```
General format to remove rule:
```bash
istio delete -f policies/{policy-file-name.yml}
```
## Installing the sample app
1. Create a docker image (ex. I've created `hello-node-image` in my `amp-istio` project.)
2. `kubectl apply -f <(istioctl kube-inject -f deployments/deployment.yml)`
3. Add a route rule `kubectl apply -f <(istioctl kube-inject -f deployments/route-rule.yml)`

# Step 1:
# This is your Docker ID/path
dockerpath=adelee2/socialize

# Step 2
# Run the Docker Hub container with kubernetes
kubectl create deploy socialize1 --image=$dockerpath

# Step 3:
# List kubernetes pods
kubectl get pods
# Step 4:
# Forward the container port to a host
kubectl port-forward pod/socialize1-79969894b7-nd7ms --address 0.0.0.0 3000:3000
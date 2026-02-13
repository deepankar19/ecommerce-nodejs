# Deployment Checklist

## Pre-Deployment (Local Setup)

- [x] Code ready and tested
- [x] Dockerfile created and tested locally
- [x] Docker image builds successfully
- [x] All environment variables documented

## GitHub Setup

- [ ] Repository pushed to GitHub
- [ ] GitHub Secrets configured (see below)

### Required GitHub Secrets:

1. **DOCKERHUB_USERNAME**
   - Go to Docker Hub settings
   - Copy your username

2. **DOCKERHUB_TOKEN**
   - Login to Docker Hub
   - Account Settings → Security → New Access Token
   - Copy the token

3. **DOCKERHUB_IMAGES_NAME**
   - Format: `username/image-name`
   - Example: `john/ecommerce`

4. **EC2_HOST**
   - Your EC2 instance public IP or DNS
   - Example: `ec2-12-34-56-78.region.compute.amazonaws.com`

5. **EC2_USER**
   - Usually: `ubuntu` (Ubuntu AMI) or `ec2-user` (Amazon Linux)

6. **EC2_SSH_KEY**
   - Your EC2 private key (.pem file contents)
   - Command to get it: `cat ~/.ssh/your-key.pem` on your local machine
   - Paste entire key content as the secret value

## EC2 Setup

- [ ] EC2 instance running
- [ ] Docker installed on EC2
  ```bash
  sudo yum update -y  # or apt-get for Ubuntu
  sudo yum install docker -y
  sudo service docker start
  sudo usermod -a -G docker ec2-user
  ```
- [ ] Security group allows port 3000 inbound traffic
- [ ] SSH key pair stored securely

## Deployment Steps

1. Push code to `main` branch
2. GitHub Actions workflow triggers automatically
3. Docker image builds and pushes to Docker Hub
4. Image deploys to EC2 and runs on port 3000
5. Access app at `http://<EC2_IP>:3000`

## Verify Deployment

```bash
# SSH into EC2
ssh -i your-key.pem ec2-user@your-ec2-ip

# Check running containers
docker ps

# View logs
docker logs demo-ecommerce-nodejs

# Stop container
docker stop demo-ecommerce-nodejs
```

## Troubleshooting

### Container exits immediately
- Check logs: `docker logs demo-ecommerce-nodejs`
- Ensure Node.js version compatibility

### Can't connect to app
- Check security group allows port 3000
- Verify container is running: `docker ps`
- Check firewall rules

### Docker Hub push fails
- Verify DOCKERHUB_TOKEN is valid
- Check repository permissions
- Ensure image name format is correct

## Rollback

To rollback to a previous version:

```bash
docker pull <DOCKERHUB_IMAGES_NAME>/ecommercenodejs:<previous_number>
docker stop demo-ecommerce-nodejs
docker rm demo-ecommerce-nodejs
docker run -d \
    --restart unless-stopped \
    -p 3000:3000 \
    --name demo-ecommerce-nodejs \
    <DOCKERHUB_IMAGES_NAME>/ecommercenodejs:<previous_number>
```

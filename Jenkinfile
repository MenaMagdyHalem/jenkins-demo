
pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = 'menamagdyhalem/jenkins-demo'
        IMAGE_TAG = "${BUILD_NUMBER}"
        CONTAINER_NAME = 'jenkins-demo'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cleaning workspace...'

                // Remove old workspace files and Git metadata
                deleteDir()

                echo 'Cloning source code from GitHub...'

                git branch: 'main',
                    url: 'https://github.com/MenaMagdyHalem/jenkins-demo.git'
            }
        }

        stage('CI - Build Docker Image') {
            steps {
                echo 'Building Docker image...'

                sh '''
                    docker build -t $DOCKERHUB_REPO:$IMAGE_TAG .
                '''
            }
        }

        stage('CI - Login and Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKERHUB_USER',
                        passwordVariable: 'DOCKERHUB_PASS'
                    )
                ]) {
                    sh '''
                        set +x

                        echo "$DOCKERHUB_PASS" | docker login \
                            --username "$DOCKERHUB_USER" \
                            --password-stdin

                        docker push $DOCKERHUB_REPO:$IMAGE_TAG

                        docker logout
                    '''
                }
            }
        }

        stage('CD - Deploy Container') {
            steps {
                echo 'Deploying application container...'

                sh '''
                    docker pull $DOCKERHUB_REPO:$IMAGE_TAG

                    docker rm -f $CONTAINER_NAME || true

                    docker run -d \
                        --name $CONTAINER_NAME \
                        --restart unless-stopped \
                        -p 3000:3000 \
                        $DOCKERHUB_REPO:$IMAGE_TAG

                    docker ps --filter "name=$CONTAINER_NAME"
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
            echo "Docker Image: $DOCKERHUB_REPO:$IMAGE_TAG"
            echo 'Application port: 3000'
        }

        failure {
            echo 'Pipeline failed. Check the Jenkins Console Output.'
        }
    }
}

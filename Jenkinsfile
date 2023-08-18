pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/kietnguyen161/nodejs_blog1.git'
            }
        }
        stage('SSH server') {
            steps {
                sshagent(['ssh-remote']) {
                    sh 'ssh -o StrictHostKeyChecking=no -l root 192.168.189.130 touch test.txt'
                }
            }
        }
    }
}
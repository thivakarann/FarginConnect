pipeline {
    agent any

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout Code') {
            steps {
                git branch: 'Fargin-SuperAdmin-UAT', credentialsId: 'thivakaran', url: 'https://github.com/Baabujiventuress/FarginConnect_Angular_Admin_Panel'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install --force'
            }
        }
        stage('Build Angular') {
            steps {
                sh 'ng b'
            }
        }
        stage('Stop Docker Container') {
            steps {
                sh 'docker stop nginx-applications'
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker-compose -f /home/docker-compose/frontend-application.yaml up -d'
            }
        }
    }
    post {
        success {
            emailext(
                subject: "Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Build Status: <b style="color:green;"> SUCCESS </b></p>
                    <p>Application API Base URL: Fargin-SuperAdmin-UAT </p>
                    <p>Using the above base URL, you can verify UI deployment and test all frontend features.</p>
                    <br/>
                    <p>Branch: ${env.GIT_BRANCH}</p>
                    <br/>
                    <p>Regards,</p>
                    <p>DevOps Team.</p>
                    <p>
                        <img src="https://babujiventures.in/assets/img/clients/baabuji-logo-1-cropped.png" alt="Baabuji Logo" style="height:60px;">
                    </p>
                """,
                to: 'sruthi.d@babujiventures.in,thivakaran.s@babujiventures.in',
                mimeType: 'text/html'

            )
        }
        failure {
            emailext(
                subject: "Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                    <p>Build Status: <b style="color:red;"> FAILED </b></p>
                    <p>Branch: ${env.GIT_BRANCH}</p>
                    <p>Please review the attached build.log file to identify the issue.</p>
                    <br/>
                    <p>Regards,</p>
                    <p>DevOps Team.</p>
                    <p>
                        <img src="https://babujiventures.in/assets/img/clients/baabuji-logo-1-cropped.png" alt="Baabuji Logo" style="height:60px;">
                    </p>
                """,
                to: 'sruthi.d@babujiventures.in,thivakaran.s@babujiventures.in',
                attachLog: 'true',
                mimeType: 'text/html'

            )
        }
    }
}

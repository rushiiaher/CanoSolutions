import Image from "next/image"

interface TechLogoProps {
  name: string
  className?: string
}

const techLogos: Record<string, { src: string; alt: string }> = {
  // AI/ML Technologies
  "TensorFlow": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow" },
  "PyTorch": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", alt: "PyTorch" },
  "OpenAI GPT": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg", alt: "OpenAI GPT" },
  "Scikit-learn": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/scikitlearn.svg", alt: "Scikit-learn" },
  "Pandas": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", alt: "Pandas" },
  "NumPy": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", alt: "NumPy" },
  "Keras": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/keras.svg", alt: "Keras" },
  "Hugging Face": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/huggingface.svg", alt: "Hugging Face" },
  "LangChain": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/langchain.svg", alt: "LangChain" },
  "Azure AI": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure AI" },
  "AWS SageMaker": { src: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png", alt: "AWS SageMaker" },
  "Google AI": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google AI" },
  
  // Web Technologies
  "React": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React" },
  "Next.js": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js" },
  "Vue.js": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", alt: "Vue.js" },
  "Angular": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg", alt: "Angular" },
  "Node.js": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js" },
  "Express.js": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/express.svg", alt: "Express.js" },
  "TypeScript": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", alt: "TypeScript" },
  "JavaScript": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript" },
  "HTML5": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML5" },
  "CSS3": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS3" },
  "Tailwind CSS": { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS" },
  "Bootstrap": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", alt: "Bootstrap" },
  "Vercel": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg", alt: "Vercel" },
  
  // Android Technologies
  "Kotlin": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", alt: "Kotlin" },
  "Java": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java" },
  "Android Studio": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg", alt: "Android Studio" },
  "Flutter": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", alt: "Flutter" },
  "React Native": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React Native" },
  "Firebase": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", alt: "Firebase" },
  "SQLite": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", alt: "SQLite" },
  "Room Database": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/android.svg", alt: "Room Database" },
  "Retrofit": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/android.svg", alt: "Retrofit" },
  "Dagger/Hilt": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/android.svg", alt: "Dagger/Hilt" },
  "Jetpack Compose": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/jetpackcompose.svg", alt: "Jetpack Compose" },
  "Material Design": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/materialdesign.svg", alt: "Material Design" },
  "Google Play Services": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleplay.svg", alt: "Google Play Services" },
  "Push Notifications": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/firebase.svg", alt: "Push Notifications" },
  "In-App Purchases": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleplay.svg", alt: "In-App Purchases" },
  "Google Maps API": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlemaps.svg", alt: "Google Maps API" },
  
  // Databases
  "MongoDB": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", alt: "MongoDB" },
  "PostgreSQL": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", alt: "PostgreSQL" },
  "MySQL": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL" },
  "Redis": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", alt: "Redis" },
  
  // Cloud & DevOps
  "AWS": { src: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png", alt: "AWS" },
  "Azure": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Microsoft Azure" },
  "Google Cloud": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google Cloud" },
  "Docker": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker" },
  "Kubernetes": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", alt: "Kubernetes" },
  "Terraform": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg", alt: "Terraform" },
  "Jenkins": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg", alt: "Jenkins" },
  "GitLab CI": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg", alt: "GitLab CI" },
  "Ansible": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg", alt: "Ansible" },
  "Prometheus": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg", alt: "Prometheus" },
  "Grafana": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg", alt: "Grafana" },
  "ELK Stack": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/elastic.svg", alt: "ELK Stack" },
  "Nginx": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", alt: "Nginx" },
  "Apache": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg", alt: "Apache" },
  "CloudFormation": { src: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png", alt: "CloudFormation" },
  
  // IoT Technologies  
  "Arduino": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg", alt: "Arduino" },
  "Raspberry Pi": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg", alt: "Raspberry Pi" },
  "ESP32": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/espressif.svg", alt: "ESP32" },
  "LoRaWAN": { src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/LoRa_Alliance_Logo.png", alt: "LoRaWAN" },
  "Zigbee": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zigbee.svg", alt: "Zigbee" },
  "WiFi": { src: "https://upload.wikimedia.org/wikipedia/commons/e/e4/WiFi_Logo.svg", alt: "WiFi" },
  "Bluetooth": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bluetooth.svg", alt: "Bluetooth" },
  "MQTT": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mqtt.svg", alt: "MQTT" },
  "CoAP": { src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/CoAP_logo.png", alt: "CoAP" },
  "Node-RED": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nodered.svg", alt: "Node-RED" },
  "InfluxDB": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/influxdb/influxdb-original.svg", alt: "InfluxDB" },
  "AWS IoT": { src: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png", alt: "AWS IoT" },
  "Azure IoT": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", alt: "Azure IoT" },
  "Google Cloud IoT": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg", alt: "Google Cloud IoT" },
  "ThingSpeak": { src: "https://upload.wikimedia.org/wikipedia/commons/3/30/ThingSpeak_logo.png", alt: "ThingSpeak" },
  
  // Enterprise Platforms
  "SAP": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sap.svg", alt: "SAP" },
  "Odoo": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/odoo.svg", alt: "Odoo" },
  "Microsoft Dynamics": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftoffice.svg", alt: "Microsoft Dynamics" },
  "Salesforce": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg", alt: "Salesforce" },
  "HubSpot": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg", alt: "HubSpot" },
  "Zoho": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zoho.svg", alt: "Zoho" },
  "Power BI": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/powerbi.svg", alt: "Power BI" },
  "Tableau": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tableau.svg", alt: "Tableau" },
  "QlikView": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/qlik.svg", alt: "QlikView" },
  "SharePoint": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftsharepoint.svg", alt: "SharePoint" },
  "Office 365": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftoffice.svg", alt: "Office 365" },
  "Teams": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftteams.svg", alt: "Teams" },
  "ServiceNow": { src: "https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg", alt: "ServiceNow" },
  "Jira": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg", alt: "Jira" },
  "Confluence": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg", alt: "Confluence" },
  "Monday.com": { src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Monday.com_logo.svg", alt: "Monday.com" },
  "Asana": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/asana.svg", alt: "Asana" },
  "Slack": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg", alt: "Slack" },
  
  // Digital Marketing Platforms
  "Google Ads": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleads.svg", alt: "Google Ads" },
  "Facebook Ads": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg", alt: "Facebook Ads" },
  "Instagram Ads": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg", alt: "Instagram Ads" },
  "LinkedIn Ads": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg", alt: "LinkedIn Ads" },
  "YouTube Ads": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg", alt: "YouTube Ads" },
  "Twitter Ads": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg", alt: "Twitter Ads" },
  "Google Analytics": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg", alt: "Google Analytics" },
  "Facebook Business": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg", alt: "Facebook Business" },
  "Mailchimp": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mailchimp.svg", alt: "Mailchimp" },
  "Hootsuite": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hootsuite.svg", alt: "Hootsuite" },
  "Buffer": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/buffer.svg", alt: "Buffer" },
  "SEMrush": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/semrush.svg", alt: "SEMrush" },
  "Ahrefs": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ahrefs.svg", alt: "Ahrefs" },
  "Moz": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/moz.svg", alt: "Moz" },
  "Canva": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/canva.svg", alt: "Canva" },
  "Adobe Creative": { src: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobe.svg", alt: "Adobe Creative" },
  "WordPress": { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg", alt: "WordPress" }
}

export default function TechLogo({ name, className = "" }: TechLogoProps) {
  const logo = techLogos[name]
  
  if (!logo) {
    // Fallback to text if logo not found
    return (
      <div className={`bg-neutralCard p-4 rounded-lg text-center hover:bg-primary/5 transition-colors ${className}`}>
        <div className="tech-mono text-sm font-medium text-textSecondary">{name}</div>
      </div>
    )
  }

  return (
    <div className={`bg-neutralCard p-4 rounded-lg text-center hover:bg-primary/5 transition-colors group ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 relative">
          <Image
            src={logo.src}
            alt={logo.alt}
            width={32}
            height={32}
            className="object-contain group-hover:scale-110 transition-transform duration-200"
          />
        </div>
        <div className="tech-mono text-xs font-medium text-textSecondary">{name}</div>
      </div>
    </div>
  )
}
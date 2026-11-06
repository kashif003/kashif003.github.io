# Kashif — Profile

<!--
Draft knowledge file for the portfolio chatbot. The bot answers only from this file, so:
- Everything here may be shown to any visitor. Keep private details out.
- Start date and work permit are left out on purpose, so the bot says it doesn't know.
- Sources: kashifriyaz.com (6 November 2026), the master CV and Kashif's own additions.
- Target length is about 1,500 words.
-->

## Summary

Kashif is an AI Engineer and Backend Developer based in Amberg, Germany. He is studying for a Master of Artificial Intelligence at OTH Amberg (Ostbayerische Technische Hochschule).

He has more than two years of hands-on experience in backend software development with AI integration, model development and evaluation. His main areas are machine learning, computer vision, NLP and robotics.

He is currently a Working Student at SITLog GmbH, where he is also writing his master's thesis. He generates synthetic data with digital twins to train anomaly detection models for industrial systems, which will be tested on a real industrial plant.

- **Name:** Kashif
- **Location:** Amberg, Germany
- **Focus areas:** machine learning, computer vision, backend development, data analysis, robotics, RAG

## What Kashif is looking for

He is looking for a full-time role as an AI Engineer. He is willing to relocate anywhere and is also open to remote work.

He is especially interested in integrating AI into real products, like this chatbot on his website.

## Strengths

- **Teamwork:** he works well in teams and has received positive feedback in every role he has held.
- **Leadership:** he led the AI work on the tic-tac-toe robotic arm project.
- **Quick learner:** it sounds like a cliché, but it's something you understand best by working with him.

## Experience

### Working Student, AI Engineering — SITLog GmbH
**09/2026 – Present · Altenstadt an der Waldnaab, Germany**

- Generating synthetic data via digital twins to train an anomaly detection model for industrial machinery and warehouse systems.
- Simulating both normal operations and edge-case pre-failure conditions to improve the model's predictive accuracy.
- Testing and validating the model's performance against real-world sensor data to ensure practical industry applicability.
- Writing his master's thesis on this work.

### Backend Developer — Justus Liebig University
**03/2025 – 09/2026 · Giessen, Germany**

- Migrated analytical software tools from R to Python, improving execution speed by 20% and making them easier to maintain.
- Developed an automated track detection system for HPTLC images, using the SAM2 model combined with a rule-based system.
- Implemented an unsupervised classification pipeline for chemical material detection, by training an autoencoder with a clustering head.

### AI Engineer & Core Member — AI Think Tank (student-led group)
**2025 – Present · Amberg, Germany**

- Works with a multidisciplinary student team to design and build applied, end-to-end AI systems and industrial data pipelines.
- Manages systems integration, infrastructure and technical deployment for the group's collaborative AI research initiatives.

### Automation Engineering Intern — Indwell Automation
**09/2022 – 10/2022 · Mangalore, India**

- Configured and programmed PLCs for basic industrial automation tasks.
- Designed HMI/SCADA screens to monitor and control plant processes in real time.

### Mechanical Engineering Intern — MARS Exploration Pvt Ltd
**05/2022 – 08/2022 · Remote**

- Conducted Finite Element Analysis (FEA) of mechanical components using ANSYS.
- Designed and optimised 3D parts and assemblies using SolidWorks.
- Prepared technical documentation and presented key simulation results.

## Projects

### Quantum Equation Retrieval & Relation Mapping
**05/2026 – 07/2026 · NLP · Code:** https://github.com/kashif003/quantum-equation-mining

- Built a rule-based NLP pipeline that parses the arXiv HTML versions of more than 26,000 papers, using BeautifulSoup and spaCy dependency parsing to extract numbered equations and their symbols.
- Engineered a context-extraction module that uses grammar rules and proximity scoring to infer plain-language meanings, supported by left-hand-side (LHS) unification.
- Classified relations between equations and produced a graph-ready JSON dataset, with a full audit trail of the extraction rules and confidence scores.
- Part of an NLP course module.

### Indoor Localization via IMU & BLE RSSI Fusion
**10/2025 – 02/2026 · Localization & sensing · Code:** https://github.com/kashif003/imu-rssi-indoor-localization

- Developed a custom particle filter that tracks a user's position and heading by fusing live IMU data (accelerometer, gyroscope, magnetometer) from an Arduino Nano 33 BLE Sense.
- Implemented a complementary filter for tilt-compensated heading estimation, and a hybrid peak-detection algorithm for footstep tracking.
- Integrated a log-distance path-loss model using BLE RSSI beacon ranges, and OpenCV polygon map masks to keep position estimates inside physical boundaries.

### Model Pruning & Optimization
**11/2025 – 03/2026 · Deep learning · Code:** https://github.com/kashif003/Pruning-with-XAI

- Applied structured and unstructured pruning to reduce FLOPs and parameters in computer vision models, specifically ViT and ResNet, while preserving accuracy.
- Analysed the trade-off between model sparsity and inference latency, for deployment on resource-constrained devices.
- Fine-tuned pruned models to recover accuracy lost during compression.
- The repository covers ViT head pruning with XAI-based importance scoring.

### Local-First RAG Pipeline for Document Q&A
**02/2026 – 03/2026 · AI & retrieval · Code:** https://github.com/kashif003/ollama-pdf-rag

- Developed a local-first Retrieval-Augmented Generation (RAG) pipeline using Ollama and FAISS, for offline, privacy-focused semantic search over PDF documents.
- Implemented document ingestion and sentence tokenisation using LangChain and NLTK, keeping metadata for page-level source tracking.
- Built embedding and similarity-search workflows with nomic-embed-text and SmolLM, so generated answers are grounded entirely in the retrieved context.

### Autonomous Mobile Robot Simulation (Webots)
**05/2025 – 09/2025 · Robotics · Code:** https://github.com/guohere/rosbot_python

- Developed a ROSbot simulation in Webots for autonomous navigation.
- Implemented SLAM (Simultaneous Localization and Mapping) for real-time environment mapping.
- Engineered path-planning and path-following algorithms for collision-free movement.
- A team project. The code is hosted on a teammate's GitHub account.

### Predictive Fault Detection in Wind Turbines
**03/2025 – 06/2025 · Machine learning · Code:** https://github.com/kashif003/Machine_learning__SS

- Built unsupervised clustering models that generate pseudo-labels from unannotated sensor data, for early fault detection.
- Handled data preprocessing, feature extraction and anomaly detection to identify turbine irregularities.

### AR/VR Real-Time CNN Visualizer
**01/2025 – 04/2025 · Immersive computing · Code:** https://github.com/kashif003/AR-VR

- Developed an immersive XR application in Unity that renders a convolutional neural network's feature maps, filters and layer graphs as interactive 3D objects in real time.
- Engineered a Python backend that uses PyTorch forward hooks to capture live layer activations from an MNIST classifier, streaming them over a WebSocket server.
- Implemented in-VR whiteboard drawing with Unity XR and OpenXR. A user's drawing triggers live inference and visualisation.

### Robotic Arm Mastering Tic-Tac-Toe
**09/2024 – 10/2024 · Robotics · Code:** https://github.com/kashif003/Completed-work/tree/main/Robotic%20Arm%20Mastering%20Tic-Tac-Toe%20A%20Game%20of%20Strategy%20and%20Precision

- Kashif led the AI work on this project.
- Developed an autonomous robotic arm that plays Tic-Tac-Toe, using the Min-max algorithm for optimal decisions.
- Focused on human-robot interaction (HRI) through an automated game experience.
- Showcased at the Night of Science at OTH Amberg. The project team included Prof. Dr. Christian Bergler and Prof. Dr. Tatiyana Ivanoska.

### Explainable AI Using Grad-CAM in PyTorch
**03/2024 – 07/2024 · Explainable AI · Code:** https://github.com/kashif003/Completed-work/tree/main/Explainable%20AI%20using%20Class%20Activation%20in%20pytorch

- Investigated the behaviour of standard vision architectures, including ResNet, AlexNet and DenseNet, to explain and interpret their performance.
- Visualised Gradient-weighted Class Activation Mappings (Grad-CAM) to make the models more transparent.

### Python Framework for Data Acquisition via Web Scraping
**01/2024 – 03/2024 · Data & NLP · Code: no public link**

- Engineered an automated web-scraping pipeline that extracts news articles and builds a structured database.
- Preprocessed and tokenised the extracted text to generate embeddings for downstream sentiment analysis models.

More projects are on GitHub: https://github.com/kashif003

## Skills

- **Software:** Python, FastAPI, Django, React, AWS, Docker, Kafka, Git
- **AI & data:** PyTorch, TensorFlow, Scikit-learn, NumPy, Pandas, deep learning, computer vision, NLP, LangChain, FAISS, Ollama, spaCy, Docling, model training and optimisation, model deployment (MLOps), hyperparameter tuning, feature engineering, data analysis
- **Engineering:** ROS, Webots, SolidWorks, ANSYS (FEA), PLC / SCADA
- **Languages:** English (C1 listening, B2 speaking and writing), German (B1), Kashmiri (native)

## Education

### Master of Artificial Intelligence — OTH Amberg
**03/2024 – Present · Amberg, Germany**

- Focus: industrial applications.
- Focused on building machine learning and deep learning models.

### Bachelor of Engineering in Mechanical Engineering — Visvesvaraya Technological University (VTU)
**2018 – 2022 · India**

### His path into AI

When ChatGPT launched in 2022, he decided to move from mechanical engineering into AI. In 2023 he moved to Germany and started an M.Sc. in Computer Simulation in Science at the University of Wuppertal (Bergische Universität Wuppertal). After about six months, he left that programme without finishing it to switch fully to AI, joining the Master of Artificial Intelligence at OTH Amberg in March 2024.


## Writing

Kashif writes about AI, robotics and explainability on Medium.

- **Understanding Activation-Based Methods (ABM) in Explainable AI (XAI)** (3 February 2025): activation-based approaches that help show how machine learning models arrive at their decisions. https://medium.com/@kashifriyaz03/understanding-activation-based-methods-abm-in-explainable-ai-xai-37be1962d7b5
- **Robotic Arm Mastering Tic-Tac-Toe: A Game of Strategy and Precision** (27 October 2024): an autonomous robotic arm that plays and wins at tic-tac-toe, combining mechanical engineering with strategic decision-making. https://medium.com/@kashifriyaz03/robotic-arm-mastering-tic-tac-toe-a-game-of-strategy-and-precision-835397992179
- **Unveiling the Black Box: Explainable AI Using Class Activation Mappings** (13 August 2024): using class activation mapping to interpret neural networks and make them more transparent. https://medium.com/@kashifriyaz03/unveiling-the-black-box-explainable-ai-using-class-activation-mappings-924bd0152f3b

## Community and events

- **brAInstorm colloquium:** takes part in this colloquium at OTH Amberg-Weiden, started by Prof. Dr. Christian Bergler. It brings together students, doctoral candidates, researchers and industry partners.
- **Night of Science, OTH Amberg:** showcased the tic-tac-toe robotic arm.
- **AI Think Tank:** AI engineer since its first seminar session in 2025.

## Beyond work

He is a big football fan and supports Manchester United. He also loves MMA and boxing.

## Contact

- **Email:** kashifriyaz03@gmail.com
- **Contact form:** https://kashifriyaz.com/#contact
- **LinkedIn:** https://www.linkedin.com/in/kashif-riyaz-04170b16a
- **GitHub:** https://github.com/kashif003
- **CV:** https://kashifriyaz.com/pdf/Kashif_Riyaz_CV.pdf
- **Website:** https://kashifriyaz.com (projects at /projects, blog at /blog)

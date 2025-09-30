const projectData = {
  nanofiber_fe: {
    // Meta Header

    // --- DATA HEADER & OVERVIEW ---
    title: "Final Year Project: Nanofiber Membranes",
    subtitle: "Advancing Filtration Efficiency through Nanofibers",
    description: "Developed BN-PVC/PEG nanofiber membranes for heavy metal removal, achieving 39% Fe removal efficiency.",
    category: "Material Science & Engineering",
    date: "August 2025",
    images: ["../img/Projects/nanofiber.jpg", "../img/Projects/contactangle.jpg"],

    overview_html: `
            <p>This project focused on the development of electrospun nanofiber membranes for heavy metal removal from groundwater. The objective was to enhance filtration efficiency while maintaining mechanical strength and chemical stability of the membrane material.</p>
            <p>The research involved optimizing polymer composition (BN-PVC/PEG), controlling electrospinning parameters, and conducting characterization tests such as SEM-EDX, tensile strength, and contact angle analysis. These steps ensured a comprehensive evaluation of membrane structure, performance, and durability.</p>
            <p>Key achievements included achieving a 39% increase in Fe removal efficiency, improving hydrophilicity through composition adjustment, and demonstrating the potential of nanofiber membranes as a sustainable solution for water purification applications.</p>
        `,

    // --- DATA SIDEBAR INFO ---
    info_client: "University Laboratory",
    info_duration: "8 months",
    info_category: "Nanomaterial Research",

    // --- DATA SKILLS USED (Array of Strings) ---
    skills: ["Electrospinning", "Material Testing", "SEM", "Data Analysis", "Excel", "Project Management"],

    // --- DATA CHALLENGES & SOLUTIONS (Array of Strings) ---
    challenges: [
      "Optimizing polymer composition for both strength and hydrophilicity",
      "Achieving uniform nanofiber morphology during electrospinning",
      "Ensuring reliable removal efficiency for Fe contaminants",
      "Balancing mechanical durability with high permeability",
    ],
    solutions: [
      "Conducted systematic variation of BN-PVC/PEG ratios to enhance performance",
      "Controlled electrospinning parameters (voltage, flow rate, distance) for uniform fibers",
      "Performed characterization tests (SEM-EDX, tensile, contact angle) to validate properties",
      "Improved membrane structure to achieve 39% higher Fe removal efficiency",
    ],

    // --- DATA RESULTS (Array of Objects) ---
    results: [
      { value: 5.5, text: "Decreased fiber diameter" },
      { value: 10.2, text: "Increased tensile strength" },
      { value: 10.4, text: "Decreased water contact angle" },
      { value: 43.7, text: "Increased water flux permeability" },
      { value: 39, text: "Fe filtration efficiency" },
    ],
  },
  bedmanufacturing_id: {
    // Meta Header

    // --- DATA HEADER & OVERVIEW ---
    title: "Hospital Bed Manufacturing",
    subtitle: "Optimizing Production & Design for Healthcare Facilities",
    description: "Designed and manufactured hospital beds with improved ergonomics, durability, and assembly efficiency.",
    category: "Mechanical & Manufacturing Engineering",
    date: "September 2025",
    image: "../img/Projects/hospitalbed.jpg",

    overview_html: `
        <p>This project focused on the design and manufacturing of hospital beds optimized for patient comfort, staff ergonomics, and production efficiency. The goal was to enhance durability while maintaining cost-effectiveness.</p>
        <p>The process involved CAD design for adjustable features, stress analysis using Ansys, prototyping, and testing for safety and stability. Workflow optimization and assembly line improvements were also implemented to reduce manufacturing time.</p>
        <p>Key achievements included improved bed ergonomics, reduced assembly time by 25%, and enhanced structural reliability suitable for hospital environments.</p>
    `,

    // --- DATA SIDEBAR INFO ---
    info_client: "MediTech Solutions",
    info_duration: "6 months",
    info_category: "Medical Equipment Manufacturing",

    // --- DATA SKILLS USED (Array of Strings) ---
    skills: ["SolidWorks", "Ansys", "Lean Manufacturing", "Prototyping", "Quality Testing", "Data Analysis"],

    // --- DATA CHALLENGES & SOLUTIONS (Array of Strings) ---
    challenges: [
      "Designing adjustable beds for patient comfort and staff ergonomics",
      "Ensuring structural strength while reducing material cost",
      "Optimizing assembly process to reduce manufacturing time",
      "Complying with medical equipment safety standards",
    ],
    solutions: [
      "Implemented modular CAD design for easy adjustments",
      "Conducted structural simulation and stress testing using Ansys",
      "Streamlined assembly workflow and introduced jigs for faster production",
      "Performed quality control and safety tests to comply with standards",
    ],

    // --- DATA RESULTS (Array of Objects) ---
    results: [
      { value: 25, text: "Reduced assembly time (%)" },
      { value: 15, text: "Material cost reduction (%)" },
      { value: 40, text: "Improved ergonomic satisfaction (%)" },
      { value: 100, text: "Safety compliance (%)" },
      { value: 30, text: "Production efficiency improvement (%)" },
    ],
  },
  carboncapture_sim: {
    // Meta Header

    // --- DATA HEADER & OVERVIEW ---
    title: "Carbon Capture Simulation",
    subtitle: "Modeling CO₂ Absorption Efficiency in Industrial Systems",
    description: "Simulated carbon capture process using ANSYS, analyzing gas flow and CO₂ absorption efficiency.",
    category: "Simulation & Process Engineering",
    date: "July 2025",
    image: "../img/Projects/carbon_capture.jpg",

    overview_html: `
        <p>This project focused on simulating the carbon capture process in industrial gas streams using ANSYS Fluent. The objective was to optimize CO₂ absorption efficiency while minimizing pressure drop and energy consumption.</p>
        <p>The simulation involved modeling multiphase gas-liquid flow, configuring absorption column parameters, and performing parametric studies to evaluate operating conditions. Key metrics such as CO₂ removal efficiency, pressure drop, and flow uniformity were analyzed.</p>
        <p>Major achievements included identifying optimal flow rates and absorber configurations that increased CO₂ capture efficiency and provided insights for scalable implementation in industrial systems.</p>
    `,

    // --- DATA SIDEBAR INFO ---
    info_client: "GreenTech Solutions",
    info_duration: "4 months",
    info_category: "Process Simulation & Optimization",

    // --- DATA SKILLS USED (Array of Strings) ---
    skills: ["ANSYS Fluent", "Process Simulation", "Data Analysis", "Multiphase Flow Modeling", "CO₂ Absorption Analysis"],

    // --- DATA CHALLENGES & SOLUTIONS (Array of Strings) ---
    challenges: [
      "Modeling accurate multiphase flow in the absorber column",
      "Optimizing operating parameters for maximum CO₂ removal",
      "Balancing pressure drop and absorption efficiency",
      "Validating simulation results with experimental data",
    ],
    solutions: [
      "Built detailed ANSYS Fluent model for gas-liquid flow",
      "Performed parametric simulations to optimize flow rates and absorber geometry",
      "Analyzed trade-offs between pressure drop and capture efficiency",
      "Compared simulation outcomes with literature data for validation",
    ],

    // --- DATA RESULTS (Array of Objects) ---
    results: [
      { value: 85, text: "CO₂ Removal Efficiency (%)" },
      { value: 12, text: "Pressure Drop Reduction (%)" },
      { value: 95, text: "Flow Uniformity (%)" },
      { value: 100, text: "Simulation Accuracy (%) vs Literature" },
    ],
  },
  structural_lab_asst: {
    title: "Structural Statics Laboratory Assistant",
    subtitle: "Assisting Experiments and Data Analysis in Structural Mechanics",
    description: "Supported structural statics lab sessions by preparing experiments, guiding students, and analyzing experimental results.",
    category: "Mechanical Engineering - Laboratory",
    date: "January 2025",
    image: "../img/Projects/structural_lab.jpg",
    overview_html: `
        <p>Assisted in the Structural Statics laboratory by setting up experiments, preparing specimens, and guiding students during practical sessions.</p>
        <p>Performed data collection and analysis using standard engineering methods, ensuring accurate results for lab reports and demonstrations.</p>
    `,
    info_client: "University Laboratory",
    info_duration: "4 months",
    info_category: "Education / Laboratory Assistance",
    skills: ["Data Analysis", "Experimental Setup", "Measurement Techniques", "Report Writing"],
    challenges: ["Ensuring accuracy in experimental measurements", "Managing multiple student groups efficiently", "Maintaining lab equipment and safety protocols"],
    solutions: ["Prepared detailed experiment instructions and setup", "Assisted students individually to ensure proper data collection", "Regularly inspected and calibrated lab equipment"],
    results: [
      { value: 100, text: "Lab Sessions Supported (%)" },
      { value: 0, text: "Safety Incidents" },
    ],
  },
  numerical_methods_project: {
    title: "Mini Project: Numerical Methods",
    subtitle: "Implementing Numerical Solutions for Engineering Problems",
    description: "Developed computational solutions for engineering problems using numerical methods such as root-finding and integration techniques.",
    category: "Mechanical / Computational Engineering",
    date: "March 2025",
    image: "../img/Projects/numerical_methods.jpg",
    overview_html: `
        <p>Implemented numerical algorithms to solve engineering problems including equations of motion, deflection of beams, and integration of functions.</p>
        <p>Tested solutions with MATLAB/Python to verify accuracy and efficiency.</p>
    `,
    info_client: "University Course Project",
    info_duration: "1 month",
    info_category: "Mini Project / Academic",
    skills: ["MATLAB", "Python", "Numerical Analysis", "Problem Solving"],
    challenges: ["Ensuring numerical stability of algorithms", "Handling complex boundary conditions", "Validating results with analytical solutions"],
    solutions: ["Implemented iterative methods with convergence checks", "Tested multiple step sizes for accuracy", "Compared results with theoretical calculations"],
    results: [
      { value: 95, text: "Accuracy (%) vs Analytical" },
      { value: 100, text: "Algorithms Implemented Successfully" },
    ],
  },
  car_price_prediction: {
    title: "Mini Project: Car Price Prediction",
    subtitle: "Predicting Used Car Prices Using Data-Driven Models",
    description: "Built a predictive model to estimate car prices based on features such as mileage, age, brand, and engine capacity using Python and machine learning techniques.",
    category: "Data Science / Machine Learning",
    date: "May 2025",
    image: "../img/Projects/car_price.jpg",
    overview_html: `
        <p>Collected and cleaned dataset of used cars, performed exploratory data analysis, and implemented regression models to predict prices.</p>
        <p>Evaluated models using metrics like RMSE and R² to ensure accurate predictions.</p>
    `,
    info_client: "University Mini Project",
    info_duration: "1 month",
    info_category: "Data Science / Academic Project",
    skills: ["Python", "Pandas", "Scikit-Learn", "Data Cleaning", "Regression Analysis"],
    challenges: ["Handling missing or inconsistent data", "Selecting relevant features for prediction", "Avoiding overfitting on small dataset"],
    solutions: ["Performed data cleaning and feature engineering", "Used cross-validation and regularization techniques", "Tested multiple regression algorithms for best performance"],
    results: [
      { value: 88, text: "R² Accuracy (%)" },
      { value: 12, text: "RMSE (kUSD)" },
    ],
  },
  fluid_lab_asst: {
    title: "Fluid Mechanics Laboratory Assistant",
    subtitle: "Guiding Students and Conducting Fluid Mechanics Experiments",
    description: "Assisted in fluid mechanics lab sessions by preparing apparatus, guiding experiments, and analyzing flow measurements.",
    category: "Mechanical Engineering - Laboratory",
    date: "February 2025",
    image: "../img/Projects/fluid_lab.jpg",
    overview_html: `
        <p>Supported lab sessions on fluid mechanics topics such as laminar and turbulent flow, pipe networks, and flow measurement techniques.</p>
        <p>Collected experimental data, assisted students, and ensured lab safety protocols were followed.</p>
    `,
    info_client: "University Laboratory",
    info_duration: "4 months",
    info_category: "Education / Laboratory Assistance",
    skills: ["Flow Measurement", "Data Analysis", "Lab Safety", "Teaching Assistance"],
    challenges: ["Maintaining accuracy in fluid measurements", "Managing multiple experiments simultaneously", "Ensuring safety around pressurized equipment"],
    solutions: ["Calibrated instruments before experiments", "Guided students step-by-step during lab sessions", "Monitored experiments to enforce safety procedures"],
    results: [
      { value: 100, text: "Lab Sessions Supported (%)" },
      { value: 0, text: "Safety Incidents" },
    ],
  },
};

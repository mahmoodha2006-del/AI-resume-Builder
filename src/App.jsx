import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { generateResumeText } from "./services/geminiService";
import Button from "./components/Button";
const STORAGE_KEY = "ai-resume-builder-data";

function App() {
  const resumeRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [summary, setSummary] = useState("");

  const [darkMode, setDarkMode] = useState(true);
  const [atsScore, setAtsScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false);

  const [targetJobDescription, setTargetJobDescription] = useState("");
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [jobMatchMessage, setJobMatchMessage] = useState("");

  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [editingExperienceIndex, setEditingExperienceIndex] = useState(null);

  const [degree, setDegree] = useState("");
  const [college, setCollege] = useState("");
  const [educationYear, setEducationYear] = useState("");
  const [education, setEducation] = useState([]);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  const [certificateName, setCertificateName] = useState("");
  const [certificateIssuer, setCertificateIssuer] = useState("");
  const [certificateYear, setCertificateYear] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [editingCertificationIndex, setEditingCertificationIndex] =
    useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      setHasLoadedSavedData(true);
      return;
    }

    try {
      const data = JSON.parse(savedData);

      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setLocation(data.location || "");
      setLinkedin(data.linkedin || "");
      setGithub(data.github || "");
      setSummary(data.summary || "");
      setDarkMode(data.darkMode ?? true);
      setSelectedTemplate(data.selectedTemplate || "modern");
      setTargetJobDescription(data.targetJobDescription || "");
      setSkills(data.skills || []);
      setExperiences(data.experiences || []);
      setEducation(data.education || []);
      setProjects(data.projects || []);
      setCertifications(data.certifications || []);
    } catch (error) {
      console.error("Failed to load saved resume:", error);
    } finally {
      setHasLoadedSavedData(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedSavedData) return;

    const data = {
      name,
      email,
      phone,
      location,
      linkedin,
      github,
      summary,
      darkMode,
      selectedTemplate,
      targetJobDescription,
      skills,
      experiences,
      education,
      projects,
      certifications,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [
    hasLoadedSavedData,
    name,
    email,
    phone,
    location,
    linkedin,
    github,
    summary,
    darkMode,
    selectedTemplate,
    targetJobDescription,
    skills,
    experiences,
    education,
    projects,
    certifications,
  ]);

  const getResumeData = () => ({
    name,
    email,
    phone,
    location,
    linkedin,
    github,
    summary,
    skills,
    experiences,
    education,
    projects,
    certifications,
  });

  const runGeminiEnhance = async (task, userText, setter) => {
    try {
      setLoadingAI(true);

      const result = await generateResumeText(task, getResumeData(), userText);

      setter(result);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const enhanceSummary = () => {
    runGeminiEnhance(
      "Write an improved professional resume summary based on the user's resume details.",
      summary,
      setSummary
    );
  };

  const enhanceTargetJobDescription = () => {
    runGeminiEnhance(
      "Rewrite this target job description into clean ATS keywords and responsibilities for resume matching.",
      targetJobDescription,
      setTargetJobDescription
    );
  };

  const enhanceCurrentExperience = () => {
    runGeminiEnhance(
      "Rewrite this work experience description into a professional resume paragraph with action verbs and measurable impact where possible.",
      jobDescription,
      setJobDescription
    );
  };

  const enhanceCurrentProject = () => {
    runGeminiEnhance(
      "Rewrite this project description into a professional resume project description using technologies, features, and impact.",
      projectDescription,
      setProjectDescription
    );
  };

  const resetTemporaryStates = () => {
    setAtsScore(0);
    setSuggestions([]);
    setMissingKeywords([]);
    setJobMatchMessage("");
    setEditingExperienceIndex(null);
    setEditingEducationIndex(null);
    setEditingProjectIndex(null);
    setEditingCertificationIndex(null);
  };

  const clearResume = () => {
    const confirmClear = window.confirm(
      "Clear all resume details? This cannot be undone."
    );

    if (!confirmClear) return;

    setName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setLinkedin("");
    setGithub("");
    setSummary("");
    setTargetJobDescription("");
    setSkill("");
    setSkills([]);

    setJobTitle("");
    setCompany("");
    setJobDescription("");
    setExperiences([]);

    setDegree("");
    setCollege("");
    setEducationYear("");
    setEducation([]);

    setProjectName("");
    setProjectTech("");
    setProjectDescription("");
    setProjects([]);

    setCertificateName("");
    setCertificateIssuer("");
    setCertificateYear("");
    setCertifications([]);

    setSelectedTemplate("modern");
    resetTemporaryStates();

    localStorage.removeItem(STORAGE_KEY);
  };

  const addSkill = () => {
    if (!skill.trim()) return;

    const formattedSkill = skill.trim();
    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === formattedSkill.toLowerCase()
    );

    if (!alreadyExists) {
      setSkills([...skills, formattedSkill]);
    }

    setSkill("");
  };

  const deleteSkill = (indexToDelete) => {
    setSkills(skills.filter((_, index) => index !== indexToDelete));
  };

  const addExperience = () => {
    if (!jobTitle.trim() || !company.trim() || !jobDescription.trim()) return;

    const experienceData = {
      jobTitle: jobTitle.trim(),
      company: company.trim(),
      jobDescription: jobDescription.trim(),
    };

    if (editingExperienceIndex !== null) {
      setExperiences(
        experiences.map((item, index) =>
          index === editingExperienceIndex ? experienceData : item
        )
      );
      setEditingExperienceIndex(null);
    } else {
      setExperiences([...experiences, experienceData]);
    }

    setJobTitle("");
    setCompany("");
    setJobDescription("");
  };

  const startEditExperience = (indexToEdit) => {
    const item = experiences[indexToEdit];

    setJobTitle(item.jobTitle);
    setCompany(item.company);
    setJobDescription(item.jobDescription);
    setEditingExperienceIndex(indexToEdit);
  };

  const cancelEditExperience = () => {
    setJobTitle("");
    setCompany("");
    setJobDescription("");
    setEditingExperienceIndex(null);
  };

  const deleteExperience = (indexToDelete) => {
    setExperiences(experiences.filter((_, index) => index !== indexToDelete));

    if (editingExperienceIndex === indexToDelete) {
      cancelEditExperience();
    }
  };

  const addEducation = () => {
    if (!degree.trim() || !college.trim() || !educationYear.trim()) return;

    const educationData = {
      degree: degree.trim(),
      college: college.trim(),
      educationYear: educationYear.trim(),
    };

    if (editingEducationIndex !== null) {
      setEducation(
        education.map((item, index) =>
          index === editingEducationIndex ? educationData : item
        )
      );
      setEditingEducationIndex(null);
    } else {
      setEducation([...education, educationData]);
    }

    setDegree("");
    setCollege("");
    setEducationYear("");
  };

  const startEditEducation = (indexToEdit) => {
    const item = education[indexToEdit];

    setDegree(item.degree);
    setCollege(item.college);
    setEducationYear(item.educationYear);
    setEditingEducationIndex(indexToEdit);
  };

  const cancelEditEducation = () => {
    setDegree("");
    setCollege("");
    setEducationYear("");
    setEditingEducationIndex(null);
  };

  const deleteEducation = (indexToDelete) => {
    setEducation(education.filter((_, index) => index !== indexToDelete));

    if (editingEducationIndex === indexToDelete) {
      cancelEditEducation();
    }
  };

  const addProject = () => {
    if (
      !projectName.trim() ||
      !projectTech.trim() ||
      !projectDescription.trim()
    ) {
      return;
    }

    const projectData = {
      projectName: projectName.trim(),
      projectTech: projectTech.trim(),
      projectDescription: projectDescription.trim(),
    };

    if (editingProjectIndex !== null) {
      setProjects(
        projects.map((item, index) =>
          index === editingProjectIndex ? projectData : item
        )
      );
      setEditingProjectIndex(null);
    } else {
      setProjects([...projects, projectData]);
    }

    setProjectName("");
    setProjectTech("");
    setProjectDescription("");
  };

  const startEditProject = (indexToEdit) => {
    const item = projects[indexToEdit];

    setProjectName(item.projectName);
    setProjectTech(item.projectTech);
    setProjectDescription(item.projectDescription);
    setEditingProjectIndex(indexToEdit);
  };

  const cancelEditProject = () => {
    setProjectName("");
    setProjectTech("");
    setProjectDescription("");
    setEditingProjectIndex(null);
  };

  const deleteProject = (indexToDelete) => {
    setProjects(projects.filter((_, index) => index !== indexToDelete));

    if (editingProjectIndex === indexToDelete) {
      cancelEditProject();
    }
  };

  const addCertification = () => {
    if (
      !certificateName.trim() ||
      !certificateIssuer.trim() ||
      !certificateYear.trim()
    ) {
      return;
    }

    const certificationData = {
      certificateName: certificateName.trim(),
      certificateIssuer: certificateIssuer.trim(),
      certificateYear: certificateYear.trim(),
    };

    if (editingCertificationIndex !== null) {
      setCertifications(
        certifications.map((item, index) =>
          index === editingCertificationIndex ? certificationData : item
        )
      );
      setEditingCertificationIndex(null);
    } else {
      setCertifications([...certifications, certificationData]);
    }

    setCertificateName("");
    setCertificateIssuer("");
    setCertificateYear("");
  };

  const startEditCertification = (indexToEdit) => {
    const item = certifications[indexToEdit];

    setCertificateName(item.certificateName);
    setCertificateIssuer(item.certificateIssuer);
    setCertificateYear(item.certificateYear);
    setEditingCertificationIndex(indexToEdit);
  };

  const cancelEditCertification = () => {
    setCertificateName("");
    setCertificateIssuer("");
    setCertificateYear("");
    setEditingCertificationIndex(null);
  };

  const deleteCertification = (indexToDelete) => {
    setCertifications(
      certifications.filter((_, index) => index !== indexToDelete)
    );

    if (editingCertificationIndex === indexToDelete) {
      cancelEditCertification();
    }
  };

  const suggestSkills = () => {
    const role = jobTitle.toLowerCase();
    let suggestedSkills = [];

    if (role.includes("frontend") || role.includes("react")) {
      suggestedSkills = ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"];
    } else if (role.includes("python") || role.includes("backend")) {
      suggestedSkills = ["Python", "Flask", "SQL", "APIs", "Automation"];
    } else if (role.includes("data")) {
      suggestedSkills = ["Python", "SQL", "Excel", "Power BI", "Data Analysis"];
    } else {
      suggestedSkills = ["Communication", "Problem Solving", "Teamwork"];
    }

    setSkills([...new Set([...skills, ...suggestedSkills])]);
  };

  const analyzeJobDescription = () => {
    if (!targetJobDescription.trim()) {
      setMissingKeywords([]);
      setJobMatchMessage("Paste a job description first.");
      return;
    }

    const commonKeywords = [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind",
      "Python",
      "SQL",
      "API",
      "Frontend",
      "Backend",
      "Git",
      "Responsive Design",
      "Communication",
      "Problem Solving",
      "Teamwork",
      "Leadership",
      "Testing",
      "Debugging",
      "Database",
      "UI",
      "UX",
    ];

    const resumeText = [
      summary,
      skills.join(" "),
      ...experiences.map((exp) => exp.jobTitle),
      ...experiences.map((exp) => exp.jobDescription),
      ...projects.map((project) => project.projectName),
      ...projects.map((project) => project.projectTech),
      ...projects.map((project) => project.projectDescription),
      ...certifications.map((item) => item.certificateName),
      ...certifications.map((item) => item.certificateIssuer),
    ]
      .join(" ")
      .toLowerCase();

    const jobText = targetJobDescription.toLowerCase();

    const matchedKeywords = commonKeywords.filter((keyword) =>
      jobText.includes(keyword.toLowerCase())
    );

    const missing = matchedKeywords.filter(
      (keyword) => !resumeText.includes(keyword.toLowerCase())
    );

    setMissingKeywords(missing);

    if (matchedKeywords.length === 0) {
      setJobMatchMessage(
        "No known technical keywords found. Try pasting a more detailed job description."
      );
      setSuggestions([
        "Paste a job description with skills, tools, and responsibilities.",
      ]);
      return;
    }

    if (missing.length > 0) {
      setJobMatchMessage(
        `Found ${matchedKeywords.length} important keywords. ${missing.length} are missing from your resume.`
      );
      setSuggestions([`Add these job keywords: ${missing.join(", ")}`]);
    } else {
      setJobMatchMessage(
        `Great match. Your resume includes all ${matchedKeywords.length} important keywords found.`
      );
      setSuggestions([
        "Good match. Your resume includes the important keywords found in the job description.",
      ]);
    }
  };

  const applyMissingKeywords = () => {
    if (missingKeywords.length === 0) {
      setJobMatchMessage("No missing keywords to apply.");
      return;
    }

    setSkills([...new Set([...skills, ...missingKeywords])]);
    setMissingKeywords([]);
    setJobMatchMessage(
      "Missing keywords added to your skills section. Review and edit them if needed."
    );
    setSuggestions(["Missing keywords were added to your skills section."]);
  };

  const enhanceWithAI = async () => {
    try {
      setLoadingAI(true);

      const improvedSummary = await generateResumeText(
        "Write an improved professional resume summary based on the user's resume details.",
        getResumeData(),
        summary
      );

      setSummary(improvedSummary);

      const updatedExperiences = [];

      for (const exp of experiences) {
        const improvedExperience = await generateResumeText(
          "Rewrite this work experience description into a professional resume paragraph with action verbs and measurable impact where possible.",
          getResumeData(),
          exp.jobDescription
        );

        updatedExperiences.push({
          ...exp,
          jobDescription: improvedExperience,
        });
      }

      setExperiences(updatedExperiences);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const calculateATSScore = () => {
    let score = 0;
    const tips = [];

    if (name.trim()) score += 10;
    else tips.push("Add your full name");

    if (email.includes("@") && email.includes(".")) score += 10;
    else tips.push("Add a valid professional email");

    if (phone.trim().length >= 10) score += 10;
    else tips.push("Add your phone number");

    if (location.trim()) score += 10;
    else tips.push("Add your location");

    if (summary.trim().length >= 50) score += 15;
    else tips.push("Write a stronger professional summary");

    if (skills.length >= 5) score += 15;
    else tips.push("Add at least 5 relevant skills");

    if (experiences.length >= 1) score += 10;
    else tips.push("Add at least one experience");

    if (education.length >= 1) score += 10;
    else tips.push("Add your education details");

    if (projects.length >= 1) score += 10;
    else tips.push("Add at least one project");

    if (certifications.length >= 1) score += 5;
    else tips.push("Add at least one certification");

    if (linkedin.trim() || github.trim()) score += 5;
    else tips.push("Add LinkedIn, GitHub, or portfolio link");

    if (targetJobDescription.trim() && missingKeywords.length === 0) {
      score += 5;
    }

    setAtsScore(Math.min(score, 100));
    setSuggestions(tips);
  };

  const downloadPDF = async () => {
    const resumeElement = resumeRef.current;

    if (!resumeElement) {
      alert("Resume preview not found.");
      return;
    }

    try {
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDocument) => {
          const clonedResume = clonedDocument.body.querySelector(
            "[data-resume-preview]"
          );

          if (!clonedResume) return;

          clonedResume.style.backgroundColor = "#ffffff";
          clonedResume.style.color = "#111827";
          clonedResume.style.boxShadow = "none";
          clonedResume.style.borderRadius = "0";

          const allElements = clonedResume.querySelectorAll("*");

          allElements.forEach((element) => {
            const isInsideHeader = element.closest("header");
            const isInsideAside = element.closest("aside");
            const isHeading = element.tagName === "H2";

            element.style.backgroundImage = "none";
            element.style.boxShadow = "none";
            element.style.textShadow = "none";
            element.style.outlineColor = "#e5e7eb";

            if (isInsideHeader || isInsideAside) {
              element.style.color = "#ffffff";
              element.style.borderColor = "#334155";

              if (element.tagName === "SPAN") {
                element.style.backgroundColor = "transparent";
              }

              return;
            }

            element.style.color = "#111827";
            element.style.borderColor = "#e5e7eb";

            if (isHeading) {
              element.style.color = "#1e40af";
              element.style.borderColor = "#cbd5e1";
            }

            if (element.tagName === "SPAN") {
              element.style.backgroundColor = "transparent";
              element.style.borderColor = "transparent";
            }
          });

          const headers = clonedResume.querySelectorAll("header, aside");

          headers.forEach((section) => {
            section.style.backgroundColor = "#111827";
            section.style.color = "#ffffff";
            section.style.borderColor = "#111827";
          });
        },
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${name || "resume"}.pdf`);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert(`PDF download failed: ${error.message}`);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 lg:p-8 ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950"
      }`}
    >
      <div className="flex gap-3 mb-6 flex-wrap">
        <Button
  onClick={() => setDarkMode(!darkMode)}
  className="bg-slate-900"
>
  Toggle Theme
</Button>
<Button
  onClick={clearResume}
  className="bg-red-600"
>
  Clear Resume
</Button>

       <Button
  onClick={suggestSkills}
  className="bg-orange-500"
>
  Suggest Skills
</Button>

       <Button
  onClick={enhanceWithAI}
  className="bg-emerald-500"
  disabled={loadingAI}
>
  {loadingAI ? "Enhancing..." : "Enhance with AI"}
</Button>

        <Button
  onClick={calculateATSScore}
  className="bg-purple-600"
>
  ATS Score
</Button>

       <Button
  onClick={downloadPDF}
  className="bg-blue-600"
>
  Download PDF
</Button>
      </div>

      <div className="mb-6 max-w-xl">
        <h2 className="text-2xl font-bold mb-2">ATS Score: {atsScore}/100</h2>

        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${atsScore}%` }}
          />
        </div>

        {suggestions.length > 0 && (
          <ul className="mt-3 text-sm space-y-1">
            {suggestions.map((tip, index) => (
              <li key={index}>- {tip}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white text-black rounded-2xl p-6 lg:p-8 shadow-xl">
          <ResumeForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            location={location}
            setLocation={setLocation}
            linkedin={linkedin}
            setLinkedin={setLinkedin}
            github={github}
            setGithub={setGithub}
            summary={summary}
            setSummary={setSummary}
            enhanceSummary={enhanceSummary}
            targetJobDescription={targetJobDescription}
            setTargetJobDescription={setTargetJobDescription}
            enhanceTargetJobDescription={enhanceTargetJobDescription}
            analyzeJobDescription={analyzeJobDescription}
            missingKeywords={missingKeywords}
            jobMatchMessage={jobMatchMessage}
            applyMissingKeywords={applyMissingKeywords}
            skill={skill}
            setSkill={setSkill}
            addSkill={addSkill}
            skills={skills}
            deleteSkill={deleteSkill}
            jobTitle={jobTitle}
            setJobTitle={setJobTitle}
            company={company}
            setCompany={setCompany}
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            enhanceCurrentExperience={enhanceCurrentExperience}
            addExperience={addExperience}
            experiences={experiences}
            deleteExperience={deleteExperience}
            startEditExperience={startEditExperience}
            cancelEditExperience={cancelEditExperience}
            editingExperienceIndex={editingExperienceIndex}
            degree={degree}
            setDegree={setDegree}
            college={college}
            setCollege={setCollege}
            educationYear={educationYear}
            setEducationYear={setEducationYear}
            education={education}
            addEducation={addEducation}
            deleteEducation={deleteEducation}
            startEditEducation={startEditEducation}
            cancelEditEducation={cancelEditEducation}
            editingEducationIndex={editingEducationIndex}
            projectName={projectName}
            setProjectName={setProjectName}
            projectTech={projectTech}
            setProjectTech={setProjectTech}
            projectDescription={projectDescription}
            setProjectDescription={setProjectDescription}
            enhanceCurrentProject={enhanceCurrentProject}
            projects={projects}
            addProject={addProject}
            deleteProject={deleteProject}
            startEditProject={startEditProject}
            cancelEditProject={cancelEditProject}
            editingProjectIndex={editingProjectIndex}
            certificateName={certificateName}
            setCertificateName={setCertificateName}
            certificateIssuer={certificateIssuer}
            setCertificateIssuer={setCertificateIssuer}
            certificateYear={certificateYear}
            setCertificateYear={setCertificateYear}
            certifications={certifications}
            addCertification={addCertification}
            deleteCertification={deleteCertification}
            startEditCertification={startEditCertification}
            cancelEditCertification={cancelEditCertification}
            editingCertificationIndex={editingCertificationIndex}
          />
        </div>

        <ResumePreview
          resumeRef={resumeRef}
          name={name}
          email={email}
          phone={phone}
          location={location}
          linkedin={linkedin}
          github={github}
          summary={summary}
          skills={skills}
          experiences={experiences}
          education={education}
          projects={projects}
          certifications={certifications}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>
    </div>
  );
}

export default App;
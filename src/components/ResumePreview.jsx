import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import ExecutiveTemplate from "../templates/ExecutiveTemplate";
import CompactTemplate from "../templates/CompactTemplate";
import AcademicTemplate from "../templates/AcademicTemplate";

function ResumePreview({
  resumeRef,
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
  selectedTemplate,
  setSelectedTemplate,
}) {
  const resumeData = {
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
    accentColor: "#1e40af",
  };

  const templates = [
    "modern",
    "minimal",
    "classic",
    "executive",
    "compact",
    "academic",
  ];

  const renderTemplate = () => {
    if (selectedTemplate === "minimal") {
      return <MinimalTemplate {...resumeData} />;
    }

    if (selectedTemplate === "classic") {
      return <ClassicTemplate {...resumeData} />;
    }

    if (selectedTemplate === "executive") {
      return <ExecutiveTemplate {...resumeData} />;
    }

    if (selectedTemplate === "compact") {
      return <CompactTemplate {...resumeData} />;
    }

    if (selectedTemplate === "academic") {
      return <AcademicTemplate {...resumeData} />;
    }

    return <ModernTemplate {...resumeData} />;
  };

  return (
    <div>
      <div className="bg-white text-black rounded-2xl p-6 shadow-xl mb-6">
        <h2 className="text-xl font-bold mb-4">Customize Resume</h2>

        <p className="font-semibold text-slate-700 mb-3">Choose Template</p>

        <div className="flex gap-3 flex-wrap">
          {templates.map((template) => (
            <button
              key={template}
              onClick={() => setSelectedTemplate(template)}
              className={`px-5 py-3 rounded-xl font-semibold capitalize ${
                selectedTemplate === template
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              {template}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={resumeRef}
        data-resume-preview
        className="bg-white text-black rounded-2xl p-10 shadow-xl min-h-[900px]"
      >
        {renderTemplate()}
      </div>
    </div>
  );
}

export default ResumePreview;
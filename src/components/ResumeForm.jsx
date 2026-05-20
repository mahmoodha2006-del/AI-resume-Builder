import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function ResumeForm({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  location,
  setLocation,
  linkedin,
  setLinkedin,
  github,
  setGithub,
  summary,
  setSummary,
  enhanceSummary,
  targetJobDescription,
  setTargetJobDescription,
  enhanceTargetJobDescription,
  analyzeJobDescription,
  missingKeywords,
  jobMatchMessage,
  applyMissingKeywords,
  skill,
  setSkill,
  addSkill,
  skills,
  deleteSkill,
  jobTitle,
  setJobTitle,
  company,
  setCompany,
  jobDescription,
  setJobDescription,
  enhanceCurrentExperience,
  addExperience,
  experiences,
  deleteExperience,
  startEditExperience,
  cancelEditExperience,
  editingExperienceIndex,
  degree,
  setDegree,
  college,
  setCollege,
  educationYear,
  setEducationYear,
  education,
  addEducation,
  deleteEducation,
  startEditEducation,
  cancelEditEducation,
  editingEducationIndex,
  projectName,
  setProjectName,
  projectTech,
  setProjectTech,
  projectDescription,
  setProjectDescription,
  enhanceCurrentProject,
  projects,
  addProject,
  deleteProject,
  startEditProject,
  cancelEditProject,
  editingProjectIndex,
  certificateName,
  setCertificateName,
  certificateIssuer,
  setCertificateIssuer,
  certificateYear,
  setCertificateYear,
  certifications,
  addCertification,
  deleteCertification,
  startEditCertification,
  cancelEditCertification,
  editingCertificationIndex,
}) {
  const editorConfig = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">
        AI Resume Builder
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Personal Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn URL"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="GitHub / Portfolio URL"
              className="w-full border border-slate-300 rounded-xl p-4"
            />
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Professional Summary
          </h2>

          <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
            <CKEditor
              editor={ClassicEditor}
              data={summary}
              config={editorConfig}
              onChange={(_, editor) => {
                setSummary(editor.getData());
              }}
            />
          </div>

          <button
            onClick={enhanceSummary}
            className="mt-3 bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold"
          >
            AI Enhance Summary
          </button>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Target Job Description
          </h2>

          <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
            <CKEditor
              editor={ClassicEditor}
              data={targetJobDescription}
              config={editorConfig}
              onChange={(_, editor) => {
                setTargetJobDescription(editor.getData());
              }}
            />
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <button
              onClick={enhanceTargetJobDescription}
              className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              AI Enhance Job Text
            </button>

            <button
              onClick={analyzeJobDescription}
              className="bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              Analyze Job Match
            </button>
          </div>

          {jobMatchMessage && (
            <div className="mt-4 bg-slate-100 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
              {jobMatchMessage}
            </div>
          )}

          {missingKeywords.length > 0 && (
            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4">
              <h3 className="font-bold text-purple-700 mb-2">
                Missing Keywords
              </h3>

              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="bg-white text-purple-700 px-3 py-2 rounded-lg text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <button
                onClick={applyMissingKeywords}
                className="mt-4 bg-purple-600 text-white px-5 py-3 rounded-xl font-semibold"
              >
                Apply Missing Keywords
              </button>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Skills
          </h2>

          <div className="flex gap-3">
            <input
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="React"
              className="flex-1 border border-slate-300 rounded-xl p-4"
            />

            <button
              onClick={addSkill}
              className="bg-blue-600 text-white px-6 rounded-xl font-semibold"
            >
              Add
            </button>
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((item, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                >
                  {item}

                  <button
                    onClick={() => deleteSkill(index)}
                    className="text-red-500 font-bold"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Experience
          </h2>

          <div className="space-y-4">
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <div className="border border-slate-300 rounded-xl overflow-hidden bg-white">
              <CKEditor
                editor={ClassicEditor}
                data={jobDescription}
                config={editorConfig}
                onChange={(_, editor) => {
                  setJobDescription(editor.getData());
                }}
              />
            </div>

            <button
              onClick={enhanceCurrentExperience}
              className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              AI Enhance Experience
            </button>

            <button
              onClick={addExperience}
              className="bg-slate-900 text-white px-6 py-4 rounded-xl w-full font-semibold"
            >
              {editingExperienceIndex !== null
                ? "Update Experience"
                : "Add Experience"}
            </button>

            {editingExperienceIndex !== null && (
              <button
                onClick={cancelEditExperience}
                className="bg-slate-200 text-slate-800 px-6 py-3 rounded-xl w-full font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {experiences.length > 0 && (
            <div className="space-y-3 mt-4">
              {experiences.map((item, index) => (
                <div
                  key={index}
                  className={`bg-slate-100 rounded-xl p-4 flex justify-between gap-4 ${
                    editingExperienceIndex === index
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-bold">{item.jobTitle}</h3>
                    <p className="text-sm text-slate-600">{item.company}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditExperience(index)}
                      className="text-blue-600 font-bold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExperience(index)}
                      className="text-red-500 font-bold"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Education
          </h2>

          <div className="space-y-4">
            <input
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Degree"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="College / University"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={educationYear}
              onChange={(e) => setEducationYear(e.target.value)}
              placeholder="Year"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <button
              onClick={addEducation}
              className="bg-slate-900 text-white px-6 py-4 rounded-xl w-full font-semibold"
            >
              {editingEducationIndex !== null
                ? "Update Education"
                : "Add Education"}
            </button>

            {editingEducationIndex !== null && (
              <button
                onClick={cancelEditEducation}
                className="bg-slate-200 text-slate-800 px-6 py-3 rounded-xl w-full font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {education.length > 0 && (
            <div className="space-y-3 mt-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className={`bg-slate-100 rounded-xl p-4 flex justify-between gap-4 ${
                    editingEducationIndex === index
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-bold">{item.degree}</h3>
                    <p className="text-sm text-slate-600">
                      {item.college} | {item.educationYear}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditEducation(index)}
                      className="text-blue-600 font-bold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteEducation(index)}
                      className="text-red-500 font-bold"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Projects
          </h2>

          <div className="space-y-4">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Project Name"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={projectTech}
              onChange={(e) => setProjectTech(e.target.value)}
              placeholder="Tech Stack"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Project description..."
              className="w-full border border-slate-300 rounded-xl p-4 h-28"
            />

            <button
              onClick={enhanceCurrentProject}
              className="bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold"
            >
              AI Enhance Project
            </button>

            <button
              onClick={addProject}
              className="bg-slate-900 text-white px-6 py-4 rounded-xl w-full font-semibold"
            >
              {editingProjectIndex !== null ? "Update Project" : "Add Project"}
            </button>

            {editingProjectIndex !== null && (
              <button
                onClick={cancelEditProject}
                className="bg-slate-200 text-slate-800 px-6 py-3 rounded-xl w-full font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {projects.length > 0 && (
            <div className="space-y-3 mt-4">
              {projects.map((item, index) => (
                <div
                  key={index}
                  className={`bg-slate-100 rounded-xl p-4 flex justify-between gap-4 ${
                    editingProjectIndex === index
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-bold">{item.projectName}</h3>
                    <p className="text-sm text-slate-600">
                      {item.projectTech}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditProject(index)}
                      className="text-blue-600 font-bold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(index)}
                      className="text-red-500 font-bold"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">
            Certifications
          </h2>

          <div className="space-y-4">
            <input
              value={certificateName}
              onChange={(e) => setCertificateName(e.target.value)}
              placeholder="Certificate Name"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={certificateIssuer}
              onChange={(e) => setCertificateIssuer(e.target.value)}
              placeholder="Issuer / Platform"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <input
              value={certificateYear}
              onChange={(e) => setCertificateYear(e.target.value)}
              placeholder="Year"
              className="w-full border border-slate-300 rounded-xl p-4"
            />

            <button
              onClick={addCertification}
              className="bg-slate-900 text-white px-6 py-4 rounded-xl w-full font-semibold"
            >
              {editingCertificationIndex !== null
                ? "Update Certification"
                : "Add Certification"}
            </button>

            {editingCertificationIndex !== null && (
              <button
                onClick={cancelEditCertification}
                className="bg-slate-200 text-slate-800 px-6 py-3 rounded-xl w-full font-semibold"
              >
                Cancel Edit
              </button>
            )}
          </div>

          {certifications.length > 0 && (
            <div className="space-y-3 mt-4">
              {certifications.map((item, index) => (
                <div
                  key={index}
                  className={`bg-slate-100 rounded-xl p-4 flex justify-between gap-4 ${
                    editingCertificationIndex === index
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-bold">{item.certificateName}</h3>
                    <p className="text-sm text-slate-600">
                      {item.certificateIssuer} | {item.certificateYear}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditCertification(index)}
                      className="text-blue-600 font-bold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCertification(index)}
                      className="text-red-500 font-bold"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ResumeForm;
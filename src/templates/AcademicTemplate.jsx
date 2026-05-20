function AcademicTemplate({
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
}) {
  const contactItems = [email, phone, location, linkedin, github].filter(Boolean);

  return (
    <div className="text-slate-950 text-[14px] leading-relaxed">
      <header className="border-b-2 border-slate-900 pb-5">
        <h1 className="text-4xl font-bold uppercase tracking-wide">
          {name || "Your Name"}
        </h1>

        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600">
          {contactItems.length > 0 ? (
            contactItems.map((item, index) => <span key={index}>{item}</span>)
          ) : (
            <span>email@example.com | phone | location</span>
          )}
        </div>
      </header>

      <section className="mt-6">
        <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">
          Career Objective
        </h2>

        <div
          className="mt-3 text-slate-700"
          dangerouslySetInnerHTML={{
            __html:
              summary ||
              "Your career objective or professional summary will appear here.",
          }}
        />
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">
          Education
        </h2>

        <div className="mt-3 space-y-4">
          {education.length > 0 ? (
            education.map((item, index) => (
              <div key={index} className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold">{item.degree}</h3>
                  <p className="text-slate-600">{item.college}</p>
                </div>

                <p className="text-sm text-slate-500">
                  {item.educationYear}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Education will appear here.</p>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">
          Projects
        </h2>

        <div className="mt-3 space-y-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between gap-4">
                  <h3 className="font-bold">{project.projectName}</h3>

                  <p className="text-sm text-slate-500">
                    {project.projectTech}
                  </p>
                </div>

                <p className="mt-1 text-slate-700">
                  {project.projectDescription}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Projects will appear here.</p>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">
          Technical Skills
        </h2>

        <p className="mt-3 text-slate-700">
          {skills.length > 0 ? skills.join(" | ") : "Skills will appear here."}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">
          Certifications
        </h2>

        <div className="mt-3 space-y-4">
          {certifications.length > 0 ? (
            certifications.map((item, index) => (
              <div key={index} className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold">{item.certificateName}</h3>
                  <p className="text-slate-600">{item.certificateIssuer}</p>
                </div>

                <p className="text-sm text-slate-500">
                  {item.certificateYear}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Certifications will appear here.
            </p>
          )}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-sm font-bold uppercase border-b border-slate-300 pb-1">
          Experience
        </h2>

        <div className="mt-3 space-y-4">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between gap-4">
                  <h3 className="font-bold">{exp.jobTitle}</h3>
                  <p className="text-sm text-slate-500">{exp.company}</p>
                </div>

                <p className="mt-1 text-slate-700">{exp.jobDescription}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Experience will appear here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default AcademicTemplate;
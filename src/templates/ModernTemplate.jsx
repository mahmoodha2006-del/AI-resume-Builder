function ModernTemplate({
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
  accentColor,
}) {
  const contactItems = [email, phone, location, linkedin, github].filter(Boolean);

  const headingStyle = { color: accentColor };
  const chipStyle = {
    color: accentColor,
    borderColor: `${accentColor}33`,
    backgroundColor: `${accentColor}12`,
  };

  return (
    <div className="text-slate-900 text-[15px] leading-relaxed">
      <header
        className="text-white rounded-2xl p-7"
        style={{ backgroundColor: accentColor }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight">
          {name || "Your Name"}
        </h1>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/90">
          {contactItems.length > 0 ? (
            contactItems.map((item, index) => <span key={index}>{item}</span>)
          ) : (
            <span>email@example.com | phone | location</span>
          )}
        </div>
      </header>

      <section className="mt-7">
        <h2
          className="text-sm font-extrabold uppercase tracking-wide border-b border-slate-200 pb-2"
          style={headingStyle}
        >
          Professional Summary
        </h2>

        <div
          className="mt-3 text-slate-700"
          dangerouslySetInnerHTML={{
            __html: summary || "Your professional summary will appear here.",
          }}
        />
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-extrabold uppercase tracking-wide border-b border-slate-200 pb-2"
          style={headingStyle}
        >
          Skills
        </h2>

        <div className="flex flex-wrap gap-2 mt-3">
          {skills.length > 0 ? (
            skills.map((item, index) => (
              <span
                key={index}
                className="border px-3 py-1.5 rounded-md text-sm font-medium"
                style={chipStyle}
              >
                {item}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">Skills will appear here.</p>
          )}
        </div>
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-extrabold uppercase tracking-wide border-b border-slate-200 pb-2"
          style={headingStyle}
        >
          Experience
        </h2>

        <div className="space-y-5 mt-4">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold text-slate-950">{exp.jobTitle}</h3>
                  <p className="text-sm text-slate-500">{exp.company}</p>
                </div>

                <p className="mt-2 text-slate-700">{exp.jobDescription}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Experience will appear here.
            </p>
          )}
        </div>
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-extrabold uppercase tracking-wide border-b border-slate-200 pb-2"
          style={headingStyle}
        >
          Education
        </h2>

        <div className="space-y-4 mt-4">
          {education.length > 0 ? (
            education.map((item, index) => (
              <div key={index} className="flex flex-wrap justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-950">{item.degree}</h3>
                  <p className="text-sm text-slate-600">{item.college}</p>
                </div>

                <p className="text-sm text-slate-500">{item.educationYear}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Education will appear here.
            </p>
          )}
        </div>
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-extrabold uppercase tracking-wide border-b border-slate-200 pb-2"
          style={headingStyle}
        >
          Projects
        </h2>

        <div className="space-y-5 mt-4">
          {projects.length > 0 ? (
            projects.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold text-slate-950">
                    {item.projectName}
                  </h3>

                  <p className="text-sm font-medium" style={headingStyle}>
                    {item.projectTech}
                  </p>
                </div>

                <p className="mt-2 text-slate-700">
                  {item.projectDescription}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">Projects will appear here.</p>
          )}
        </div>
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-extrabold uppercase tracking-wide border-b border-slate-200 pb-2"
          style={headingStyle}
        >
          Certifications
        </h2>

        <div className="space-y-3 mt-4">
          {certifications.length > 0 ? (
            certifications.map((item, index) => (
              <div key={index} className="flex flex-wrap justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-950">
                    {item.certificateName}
                  </h3>

                  <p className="text-sm text-slate-600">
                    {item.certificateIssuer}
                  </p>
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
    </div>
  );
}

export default ModernTemplate;
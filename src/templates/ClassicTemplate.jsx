function ClassicTemplate({
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

  return (
    <div className="text-slate-950 font-serif text-[14px] leading-relaxed">
      <header className="text-center border-b-2 border-slate-950 pb-5">
        <h1 className="text-4xl font-bold uppercase tracking-wide">
          {name || "Your Name"}
        </h1>

        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-slate-600">
          {contactItems.length > 0 ? (
            contactItems.map((item, index) => <span key={index}>{item}</span>)
          ) : (
            <span>email@example.com | phone | location</span>
          )}
        </div>
      </header>

      <section className="mt-7">
        <h2
          className="text-sm font-bold uppercase border-b border-slate-400 pb-1 tracking-wide"
          style={headingStyle}
        >
          Professional Summary
        </h2>

        <div
          className="mt-3 text-slate-800"
          dangerouslySetInnerHTML={{
            __html: summary || "Your professional summary will appear here.",
          }}
        />
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-bold uppercase border-b border-slate-400 pb-1 tracking-wide"
          style={headingStyle}
        >
          Skills
        </h2>

        {skills.length > 0 ? (
          <p className="mt-3 text-slate-800">{skills.join(" | ")}</p>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            Skills will appear here.
          </p>
        )}
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-bold uppercase border-b border-slate-400 pb-1 tracking-wide"
          style={headingStyle}
        >
          Experience
        </h2>

        <div className="space-y-5 mt-4">
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold">{exp.jobTitle}</h3>

                  <p className="text-sm italic text-slate-600">
                    {exp.company}
                  </p>
                </div>

                <p className="mt-2 text-slate-800">{exp.jobDescription}</p>
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
          className="text-sm font-bold uppercase border-b border-slate-400 pb-1 tracking-wide"
          style={headingStyle}
        >
          Education
        </h2>

        <div className="space-y-4 mt-4">
          {education.length > 0 ? (
            education.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold">{item.degree}</h3>

                  <p className="text-sm text-slate-600">
                    {item.educationYear}
                  </p>
                </div>

                <p className="text-sm italic text-slate-700">
                  {item.college}
                </p>
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
          className="text-sm font-bold uppercase border-b border-slate-400 pb-1 tracking-wide"
          style={headingStyle}
        >
          Projects
        </h2>

        <div className="space-y-5 mt-4">
          {projects.length > 0 ? (
            projects.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold">{item.projectName}</h3>

                  <p className="text-sm italic text-slate-600">
                    {item.projectTech}
                  </p>
                </div>

                <p className="mt-2 text-slate-800">
                  {item.projectDescription}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Projects will appear here.
            </p>
          )}
        </div>
      </section>

      <section className="mt-7">
        <h2
          className="text-sm font-bold uppercase border-b border-slate-400 pb-1 tracking-wide"
          style={headingStyle}
        >
          Certifications
        </h2>

        <div className="space-y-4 mt-4">
          {certifications.length > 0 ? (
            certifications.map((item, index) => (
              <div key={index}>
                <div className="flex flex-wrap justify-between gap-2">
                  <h3 className="font-bold">{item.certificateName}</h3>

                  <p className="text-sm text-slate-600">
                    {item.certificateYear}
                  </p>
                </div>

                <p className="text-sm italic text-slate-700">
                  {item.certificateIssuer}
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

export default ClassicTemplate;
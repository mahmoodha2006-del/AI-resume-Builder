function ExecutiveTemplate({
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
    <div className="grid grid-cols-[32%_1fr] gap-8 text-slate-900 text-[14px] leading-relaxed">
      <aside className="bg-slate-900 text-white rounded-xl p-6">
        <h1 className="text-3xl font-bold leading-tight">
          {name || "Your Name"}
        </h1>

        <section className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Contact
          </h2>

          <div className="mt-3 space-y-2 text-sm text-slate-100 break-words">
            {contactItems.length > 0 ? (
              contactItems.map((item, index) => <p key={index}>{item}</p>)
            ) : (
              <p>email@example.com | phone | location</p>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Skills
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-white/10 border border-white/15 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-300">Skills will appear here.</p>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Education
          </h2>

          <div className="mt-3 space-y-4">
            {education.length > 0 ? (
              education.map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{item.degree}</h3>
                  <p className="text-sm text-slate-300">{item.college}</p>
                  <p className="text-xs text-slate-400">
                    {item.educationYear}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-300">
                Education will appear here.
              </p>
            )}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Certifications
          </h2>

          <div className="mt-3 space-y-4">
            {certifications.length > 0 ? (
              certifications.map((item, index) => (
                <div key={index}>
                  <h3 className="font-semibold">{item.certificateName}</h3>
                  <p className="text-sm text-slate-300">
                    {item.certificateIssuer}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.certificateYear}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-300">
                Certifications will appear here.
              </p>
            )}
          </div>
        </section>
      </aside>

      <main>
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-2">
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
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-2">
            Experience
          </h2>

          <div className="mt-4 space-y-5">
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between gap-4">
                    <h3 className="font-bold">{exp.jobTitle}</h3>

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
          <h2 className="text-sm font-bold uppercase tracking-wide border-b border-slate-300 pb-2">
            Projects
          </h2>

          <div className="mt-4 space-y-5">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between gap-4">
                    <h3 className="font-bold">{project.projectName}</h3>

                    <p className="text-sm text-slate-500">
                      {project.projectTech}
                    </p>
                  </div>

                  <p className="mt-2 text-slate-700">
                    {project.projectDescription}
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
      </main>
    </div>
  );
}

export default ExecutiveTemplate;
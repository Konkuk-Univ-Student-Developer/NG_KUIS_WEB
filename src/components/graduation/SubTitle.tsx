function Subtitle({ title }: { title: string }) {
  const subtitleClasses = `
    self-stretch text-darkgray text-base md:text-xl leading-[48px]
    md:pb-2
  `;

  return (
    <div className={subtitleClasses.trim().replace(/\s+/g, " ")}>{title}</div>
  );
};

export default Subtitle;

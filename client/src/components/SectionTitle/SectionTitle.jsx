const SectionTitle = ({heading, subHeading}) => {
  return (
    <div className="mx-auto text-center md:w-1/3 lg:w-1/4 my-8">
      <p className="text-yellow-500 mb-2">---{subHeading}---</p>
      <h2 className="text-3xl uppercase border-y-4 py-4">{heading}</h2>
    </div>
  );
};

export default SectionTitle;

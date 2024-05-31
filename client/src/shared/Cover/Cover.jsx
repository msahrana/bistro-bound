const Cover = ({img, title, description}) => {
  return (
    <div className="h-[650px] pt-60" style={{backgroundImage: `url("${img}")`}}>
      <div className="bg-gray-500 mx-40 p-24 bg-opacity-50 text-white text-center">
        <h1 className="text-5xl uppercase font-bold">{title}</h1>
        <p className="pt-5 uppercase">{description}</p>
      </div>
    </div>
  );
};

export default Cover;

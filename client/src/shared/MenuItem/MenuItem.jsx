const MenuItem = ({item}) => {
  const {name, image, recipe, price} = item || {};

  return (
    <div className="flex space-x-4">
      <img
        style={{borderRadius: "0 200px 200px 200px"}}
        className="size-16 md:w-28 ml-1"
        src={image}
        alt=""
      />
      <div>
        <h1 className="uppercase font-semibold">{name}------------</h1>
        <p>{recipe}</p>
      </div>
      <p className="text-yellow-600">$ {price}</p>
    </div>
  );
};

export default MenuItem;

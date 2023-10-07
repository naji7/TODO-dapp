type FeatureCarsProps = {
  icon: any;
  title: String;
  description: String;
};
export default function FeaturesCard(props: FeatureCarsProps) {
  const { icon, title, description } = props;
  return (
    <div className="border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer hover:opacity-70 ease-in duration-200">
      <div className="inline-block rounded-2xl py-5 px-6">{icon}</div>
      <h3 className="text-xl font-bold py-4 text-color-secondary">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function CardCommand({
  title,
  description,
  anything
}) {
  const content = (
    <div className="p-5 flex items-center justify-center bg-gray-50 rounded-md flex-1 hover:bg-gray-100">
      <div
        style={{ height: 20, width: 20 }}
        className="bg-indigo-300 rounded-full animate-pulse"
      />
      <div className="ml-5 flex flex-col flex-1 ">
        <p className="font-bold leading-none text-lg tracking-wider text-gray-600">
          {title}
        </p>
        <p className="text-gray-400 mt-2">{description}</p>
        {anything}
      </div>
      
    </div>
  );

 
  return content;
}

import { motion, AnimatePresence } from 'framer-motion';

export const Suggestions = ({ suggests, onSelect, suggestionName }) => {
    const shouldShow = suggests && suggests.length > 0;
    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 w-full mt-1 shadow-lg z-20 bg-white rounded-md overflow-y-auto scrollbar-thin max-h-[400px]"
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <h3 className="text-gray-600 bold m-2">{suggestionName}</h3>
                    {suggests.map((suggestion, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.2,
                                delay: index * 0.05
                            }}
                            className="border-b-[1.5px] text-gray-900 border-gray-200 px-3 py-2 hover:bg-green-300 cursor-pointer transition duration-150 ease-in-out"
                            onMouseDown={() => onSelect(suggestion)}
                        >
                            {suggestion}
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const SuggestionList = ({ title, suggestions, onSelect }) => {
  if (!suggestions?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full md:w-1/2 bg-white border-b md:border-b-0 md:border-r border-gray-100 last:border-0 flex-grow "
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="sticky top-0 bg-white z-10 border-b border-gray-100">
        <h3 className="text-gray-600 font-semibold p-3 shadow-sm">
          {title}
        </h3>
      </div>
      <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto scrollbar-thin">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.2,
              delay: index * 0.05
            }}
            className="border-b-[1.5px] text-zinc-800 border-gray-300 px-3 py-2 hover:bg-green-300 cursor-pointer transition duration-150 ease-in-out"
            onMouseDown={() => onSelect(suggestion)}
          >
            {suggestion}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export const QuerySuggestions = ({ docSuggests = [], conditionSuggests = [], onSelect }) => {
  const hasResults = (docSuggests.length > 0 || conditionSuggests.length > 0);
  
  const lists = [
    { title: 'Doctors', suggestions: docSuggests },
    { title: 'Conditions', suggestions: conditionSuggests }
  ].sort((a, b) => a.suggestions.length - b.suggestions.length);

  if (!hasResults) return null;

  return (
    <div className="absolute top-12 w-full rounded-md shadow-lg z-20 bg-white overflow-hidden">
      <AnimatePresence>
        <div className="flex flex-col md:flex-row">
          {lists.map(({ title, suggestions }) => (
            <SuggestionList
              key={title}
              title={title}
              suggestions={suggestions}
              onSelect={onSelect}
            />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
};

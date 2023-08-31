import React, { useContext } from "react";
import { MealsContext } from "../../contexts/Mealcontext";

function ContextTester() {
  const data = useContext(MealsContext);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ContextTester;

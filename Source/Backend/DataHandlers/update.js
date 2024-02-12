import { CricketersData } from '../Connections/database.js';

function updateData(request, response) {
  const cricketerData = {
    name: request.body.name,
    age: request.body.age,
    nation: request.body.nation,
    ranking: request.body.ranking,
    premierLeague: request.body.premierLeague,
    image: request.body.image,
    wikipediaUrl: request.body.wikipediaUrl,
  };

  CricketersData.findByIdAndUpdate(
    request.params.id,
    { $set: cricketerData },
    { new: true },
    (err, data) => {
      if (!err) {
        response.status(200).json(data);
      } else {
        console.log(err);
      }
    }
  );
}
export default updateData;

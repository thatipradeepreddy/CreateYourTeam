import { CricketersData } from '../Connections/database.js';

function updateData(request, response) {
  const cricketerData = {
    place: request.body.place,
    player: request.body.player.map(player => ({
      name: player.name,
      age: player.age,
      nation: player.nation,
      ranking: player.ranking,
      premierLeague: player.premierLeague,
      image: player.image,
      wikipediaUrl: player.wikipediaUrl
    }))
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

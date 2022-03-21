const sequelize = require('../sequelize/index.js');
const { pickRandom, randomDate } = require('./helpers/random');

async function reset() {
	console.log('Will rewrite the SQLite example database, adding some dummy data.');

	await sequelize.sync({ force: true });

	// await sequelize.models.user.bulkCreate([
	// 	{ username: 'jack-sparrow' },
	// 	{ username: 'white-beard' },
	// 	{ username: 'black-beard' },
	// 	{ username: 'brown-beard' },
	// ]);
	const fs = require('fs')
	const regexp = /e-/ig;
	const regexp2 = /e+/ig;
	var data = fs.readFileSync('./sqlite-example-database/data.csv')
		.toString() // convert Buffer to string
		.split('\n') // split string to lines
		// .map(e=>e.match(regexp)?e:'')
		// .map(e=>e.match(regexp2)?e:'')
		.map(e => e.trim()) // remove white spaces for each line
		.map(e => e.split(';').map(e => e.trim())); // split each line to array
	var data_sortie = []
	data.slice(1).forEach(function (item, index) {
		if (item[9]===undefined){
			item[9]=''
		}
		if (item[8]===undefined){
			item[8]=''
		}
		if (item[7]===undefined){
			item[7]=''
		}
		if (item[6]===undefined){
			item[6]=''
		}
		if (item[5]===undefined){
			item[5]=''
		}
		if (item[4]===undefined){
			item[4]=''
		}
		if (item[3]===undefined){
			item[3]=''
		}
		if (item[2]===undefined){
			item[2]=''
		}
		if (item[1]===undefined){
			item[1]=''
		}
		data_sortie.push({
			name: item[0],
			mass:item[1]!==''? parseFloat(item[1]):null,
			orbital_period:item[2]!==''? parseFloat(item[2]):null,
			discovered:item[3]!==''? parseInt(item[3]):null,
			radius:item[4]!==''? parseFloat(item[4]):null,
			semi_major_axis:item[5]!==''? parseFloat(item[5]):null,
			star_distance:item[6]!==''? parseFloat(item[6]):null,
			temp:item[7]!==''? parseFloat(item[7]):null,
			method:item[8],
			star_name:item[9]
		})
	});

	// await sequelize.models.planets.bulkCreate([
	// 	{ Field2: 'fhdfhdfhdh', Field3: 'fhdfhdfhdh' },
	// 	{ Field2: 'gjjj', Field3: 'fhdfhdfhggdh' }
	// ]);

	await sequelize.models.planets.bulkCreate(data_sortie);

	// await sequelize.models.user.bulkCreate([
	// 	{ username: 'jack-sparrow' },
	// 	{ username: 'white-beard' },
	// 	{ username: 'black-beard' },
	// 	{ username: 'brown-beard' },
	// ]);

	// await sequelize.models.orchestra.bulkCreate([
	// 	{ name: 'Jalisco Philharmonic' },
	// 	{ name: 'Symphony No. 4' },
	// 	{ name: 'Symphony No. 8' },
	// ]);

	// Let's create random instruments for each orchestra
	// for (const orchestra of await sequelize.models.orchestra.findAll()) {
	// 	for (let i = 0; i < 10; i++) {
	// 		const type = pickRandom([
	// 			'violin',
	// 			'trombone',
	// 			'flute',
	// 			'harp',
	// 			'trumpet',
	// 			'piano',
	// 			'guitar',
	// 			'pipe organ',
	// 		]);

	// 		await orchestra.createInstrument({
	// 			type: type,
	// 			purchaseDate: randomDate()
	// 		});

	// 		// The following would be equivalent in this case:
	// 		// await sequelize.models.instrument.create({
	// 		// 	type: type,
	// 		// 	purchaseDate: randomDate(),
	// 		// 	orchestraId: orchestra.id
	// 		// });
	// 	}
	// }

	console.log('Done!');
}

reset();

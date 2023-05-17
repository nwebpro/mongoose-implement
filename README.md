```js
1. npm init -y
2. npm install typescript --save-dev
3. npm install express --save
4. npm install mongoose --save
5. npm i ts-node-dev 
6. create src folder and create server.ts file then add this code to your file

    const express = require('express')
    const app = express()
    const port = 5000

    app.get('/', (req, res) => {
    res.send('Hello World!')
    })

    app.listen(port, () => {
    console.log(`Server is listening on port ${ port }`)
    })

7. open package.json and add this code "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
8. open mongoosejs.com/docs/index.html then add this code 

    const mongoose = require('mongoose')
    // database connection
    async function main() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/mongoose-implement');
            console.log(`Database Connection Successfully`)
        } catch (error) {
            console.log(`Database Connection Failed`)
        }
    }
    main().catch(err => console.log(err));

9. npm install cors
10. npm i --save-dev @types/cors
11. npm i --save-dev @types/express


Interface - user.interface.ts
Schema + Model - user.model.ts
route + route handler - user.route.ts
Database Query Function - user.service.ts

instance methods -> instance er methods
class -> instance + methods -> instance er methods


insert and insertMany mongoose a kaj kore na kinto mongoDB te kore ar mongoose a save() methods kaj kore


show databases
use [dbname]
db.getCollection('collectionName).find()
db.getCollection('collectionName).find().limit(5)
Tools name -> studio3t and no sql boster

No SQL Boster Shortcut
format -> alt + shift + f
run -> ctrl + enter

db.practice.find({ age: { $eq: 34 } }) // Equal Oparator usecase
db.practice.find({ age: { $gt: 34 } }) // Greater Than Oparator usecase
db.practice.find({ age: { $gte: 34 } }) // Greater Than or Equal Oparator usecase
db.practice.find({ age: { $lt: 34 } }) // Less Than Oparator usecase
db.practice.find({ age: { $lte: 34 } }).sort({ age: 1 }) // Less Than or Equal Oparator usecase // 1->accending -1->decending
db.practice.find({ gender: { $ne: 'Female' } }).project({ gender: 1 }) // Not Equal Oparator usecase
db.practice.find({ favoutiteColor: { $eq: 'Blue' } }, { favoutiteColor: 1 }) // Equal Oparator with filter

db.practice.find({ age: { $in: [34, 35] } }) // In Oparator usecase
db.practice.find({ age: { $nin: [34, 35] } }) // Not In Oparator usecase
db.practice.find({  age: { $gt: 18 , $lt: 30 }}) // $gt and $lt er maj khane je [,] qoma use hoyche take bola hoy implicit and kinto jokhn aki name bar bar use hobe tokgn implicit and use kora jabe na 

// multiple conditions
db.practice.find({
    gender: 'Female',
    age: { $nin: [12, 3, 4, 7, 17, 18, 23, 34] },
    interests: {
        $in: ['Gaming', 'Travelling']
    }
}).project({
    gender: 1,
    age: 1,
    interests: 1
}).sort({
    age: 1
})

// Logical Query Operator
db.practice.find({
    $and: [
        { gender: 'Female' },
        { age: { $lt: 30 } },
        { 'skills.name': 'JAVASCRIPT' } // nested value access korte chayle ai vabe korte hobe
    ]
}).project({
    gender: 1,
    age: 1,
    'skills.name': 1
})

// or
db.practice.find({
    $or: [
        { gender: 'Female' },
        { age: { $lt: 30 } },
        { 'skills.name': 'JAVASCRIPT' }
    ]
}).project({
    gender: 1,
    age: 1,
    'skills.name': 1
})


$exists // check kore je kono property ase kina aita check kore true or false
$type // check kore je aita ki type er data 
$size // er maddome array te dekhe je data ace naki nay
$all // 
$$elemMatch // er kaj hocche kono akta array of object theke match kore data show korte chayle ai method ta use kora hoy

kono akta array te Travelling name a data ace kina abong aita koto number index gulate ace ta ber korar jonno amra nicher code ta follow korbo
db.practice.find({
    'interests.0': 'Travelling'
}).project({
    interests: 1
})

// $all abong $and pry same kaj kore chayle apni $all or $and use korte paren abong judi same field er onk valu show korte chan tahole $all use kora valo and easy
db.practice.find({
    interests: {
        $all: ['Travelling', 'Cooking', 'Reading']
    }
}).project({
    interests: 1
})
```
## ```$set``` -> hocche database a age theke kono value thakle abong judi $set use kore update kora hoy tayle se purapuri update kore fele

## ```$addToSet``` -> hocche database a age theke kono value thakle abong judi $addToSet use kore update kora hoy tayle se age check kore dekhe je same valu database a ace kina thakle update kore na ar na thakle update kore

## ```$push``` -> hocche database a age theke kono value thakle abong judi $push use kore update kora hoy tayle se ager datar sathe match korle o se update kore dey 

## ```$unset``` -> database collection a kono data abong field remove korte chay tahole amra $unset use korbo 

## ```$pop``` -> database er moddhe kono array field thakle tar moddhe theke sesh element ta remove korte chayle $pop use korbo abong apni judi $pop { data: 1 } use koro tayle last element remove hobe ar judi -1 use koro tayle protom element remove hobe

## ```$pull``` -> database collection theke judi kono akta nirdisto data remove korte chay tahole $pull use korbo

## ```$pullAll``` -> hocche $pull er moto kaj kore kinto $pullAll multiple data remove korte kaje lage 


```js
db.cousins.aggregate([
    // Filter out cousins who have an exam
    {
        $match: {
            hasExam: { $ne: true }
        }
    },
    // Filter out cousins who have a budget less than or equal to 500
    {
        $match: {
            budget: { $gt: 500 }
        }
    },
    // Filter out cousins who are sick
    { 
        $match: {
            isSick: { $ne: true }
        }
    },
    // Calculate the total budget of the remaining cousins
    {
        $group: {
            _id: null,
            totalBudget: { $sum: '$budget' }
        }
    },
    // Sort the remaining cousins by age in descending order
    {
        $sort: {
            age: -1
        }
    },
    // Limit the output to the tor 2 cousins
    {
        $limit: 2
    }
])

// new field add salary in aggregate pipeline with new collection
db.practice.aggregate([
    // add field stage
    {
        $addFields: {
            salary: {
                $toInt: {
                    $floor: {
                        $multiply: [{ $rand: {} }, 100]
                    }
                }
            }
        }
    },
    {
        $out: "salaryWithPractices"
    }
])

// new field add salary in aggregate pipeline with existing collection
db.practice.aggregate([
    // add field stage
    {
        $addFields: {
            salary: {
                $toInt: {
                    $floor: {
                        $multiply: [{ $rand: {} }, 100]
                    }
                }
            }
        }
    },
    {
        $merge: "practice"
    }
])

// group stage with _id field and multiply field
db.practice.aggregate([
    // Group stage
    {
        $group: {
            _id: {
                age: '$age',
                gender: '$gender'
            }
        }
    }
])

// multiply field in group stage and multiple conditions
db.practice.aggregate([
    // match stage 
    {
        $match: {
            age: {
                $gt: 18
            }
        }
    },
    // Group stage
    {
        $group: {
            _id: '$salary',
            person: { $sum: 1 } // Accumulator
        }
    },
    // Project Stage with field name change 
    {
        $project: {
            _id: 0,
            salary: '$_id',
            person: 1,
        }
    },
    // Sort Stage with id
    {
        $sort: {
            _id: -1
        }
    },
    // limit stage
    {
        $limit: 5
    }
])

db.practice.aggregate([
    {
        $group: {
            _id: null,
            persons: {
                $sum: '$salary',
            },
            maxSalary: {
                $max: "$salary"
            },
            minSalary: {
                $min: '$salary'
            },
            avgSalary: {
                $avg: "$salary"
            }
        }
    },
    { 
        $project: { 
            persons: 1,
            maxSalary: 1,
            minSalary: 1,
            avgSalary: 1,
            salaryRang: {
                $subtract: [ "$maxSalary", '$minSalary' ]
            }
        } 
    }
])

/*
$unwide method er kaj hocche apner akta array ace friend name abong
apni judi sey array te $unwind method apply koren tahole apner array te 
joto jon friend ace sobai k copy kore se akta akta kore data baniye nibe.
*/
db.practice.aggregate([
    {
        // unwind stage
        $unwind: "$friends"
    },
    {
        // group stage
        $group: { 
            _id: "$friends",
            count: {
                $sum: 1
            }
        }
    }
])

// $facet oparator er maddome apni apner aggregation a multiple stage
// pipeline line create korte parben ta niche example dewa ace 
db.practice.aggregate([
    {
        $match: {
            _id: ObjectId('6406ad65fc13ae5a400000c6')
        }
    },
    {
        $facet: {
            // Pipeline One
            'friendsCount': [
                {
                    $project: {
                        friendsCount: {
                            $size: '$friends'
                        }
                    }
                }
            ],
            // Pipeline Tow
            'interestsCount': [
                {
                    $project: {
                        interestsCount: {
                            $size: "$interests"
                        }
                    }
                }
            ],
            // Pipeline Three
            'skillsCount': [
                {
                    $project: {
                        skillsCount: {
                            $size: "$skills"
                        }
                    }
                }
            ],
            // Pipeline Four 
            'languagesCount': [
                {
                    $project: {
                        languagesCount: {
                            $size: "$languages"
                        }
                    }
                }    
            ]
        },
    }
])

/*$lookup operator hocche kono akta document theke kicho ber korte
 chayle amra lookup oparator use korte pari abong document ta kono akta 
 field er sathe refarance thakte hobe abong lookup chalaite hole apnake
 1 er odik collection thakte hobe abong sathe field name abong type 
 same hote hobe nayto lookup oparator kaj korbe nah 
*/
db.practice.aggregate([
    {
        $match: {
            email: 'dladley0@washingtonpost.com'
        }
    },
    {
        $lookup: {
            from: "additionalInfo", // jey collection er data copy kore anbo sey collection er name ai khane dite hobe
            localField: "_id", // local field
            foreignField: "userId", // forane field
            as: "additionalInformation" // ki name field add hobe collecton a seyta aikhane dite hoy
        }
    }
])
```
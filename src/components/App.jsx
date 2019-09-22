import React from "react";
import { config } from "../phaser/config/config"

import taskImg from "../assets/sprites/task/task_3d.png"
import taskSpriteSheet from "../assets/sprites/task/spritesheet.png"

import { bpmnJson } from "../assets/xml/latest";

export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.createTask = this.createTask.bind(this);
	}

	componentDidMount() {
		var that = this;

		config.scene.preload = function () {
			this.load.image('house', taskImg);
			this.load.spritesheet('task', taskSpriteSheet, { frameWidth: 98, frameHeight: 99 })
		}

		config.scene.create = function () {
			var scene = this;

			scene.add.isobox(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth, 15, 0xCCCCCC, 0x999999, 0x666666);

			bpmnJson.definitions.process.task.map(function (task, i) {
				var bpmnShape = bpmnJson.definitions.BPMNDiagram.BPMNPlane.BPMNShape;
				var taskProps = bpmnShape.filter(function (shape) {
					return shape._bpmnElement == task._id
				})

				that.createTask(i, task, scene, taskProps)
			});
		}
	}

	createTask(i, task, scene, taskProps) {
		var config = {
			key: 'walk',
			frames: scene.anims.generateFrameNumbers('task'),
			frameRate: 15,
			yoyo: true,
			repeat: -1
		};

		scene.anims.create(config);


		var taskObj = scene.add.image(taskProps[0].Bounds._x, taskProps[0].Bounds._y, 'house').setScale(0.2);
		taskObj.depth = 2;
		// var taskSprite = scene.add.sprite(taskProps[0].Bounds._x, taskProps[0].Bounds._y, 'task');
		// taskSprite.smoothed = true;

		// taskSprite.anims.load('walk');
		// taskSprite.anims.play('walk');
	}

	render() {
		return (
			<div style={{ textAlign: "center" }}>
			</div>
		);
	}
}

import { Component, OnInit } from '@angular/core';
import { Prediction } from './../prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-webcam',
	templateUrl: './webcam.component.html',
	styleUrls: ['./webcam.component.scss'],
})
export class WebcamComponent implements OnInit, AfterViewInit {
	@ViewChild('video') video: ElementRef;
	predictions: Prediction[];
	model: mobilenet.MobileNet;
	loading: boolean = true;
	constructor() {}

	ngOnInit(): void {
		this.loading = true;
		this.load();
		this.loading = false;

		setInterval(async () => {
			this.predictions = await this.model.classify(this.video.nativeElement);
			await tf.nextFrame();
		}, 3000);
	}

	async ngAfterViewInit() {
		const vid = this.video.nativeElement;

		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					vid.srcObject = stream;
				})
				.catch((err0r) => {
					console.log('Something went wrong!');
				});
		}
	}

	async load(): Promise<void> {
		this.model = await mobilenet.load();
	}
}

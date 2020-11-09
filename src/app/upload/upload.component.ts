import { Component, OnInit } from '@angular/core';
import { Prediction } from '../prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
	selector: 'app-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
	model: any;
	loading: boolean = true;
	imageSource: string;
	predictions: Prediction[];
	@ViewChild('img') element: ElementRef;

	constructor() {}

	ngOnInit(): void {
		this.loading = true;
		this.load();
		this.loading = false;
	}

	async load(): Promise<void> {
		this.model = await mobilenet.load();
	}

	async fileChangeEvent(event) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]);

			reader.onload = (res: any) => {
				this.imageSource = res.target.result;
				setTimeout(async () => {
					const imageElement = this.element.nativeElement;
					this.predictions = await this.model.classify(imageElement);
				}, 0);
			};
		}
	}
}

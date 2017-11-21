#include <iostream>
#include <wiringPi.h>

#define LEDGPIO 6	//25 BCM

using namespace std;
/*
1) in the directory: of Led.c:
2)  g++  Led.c -l wiringPi -o  Led
sudo ./Led
 */

void blinkAWhile(){
	for( int i=1; i<= 5; i++){
			delay(500);
			digitalWrite(LEDGPIO, HIGH);
			delay(500);
			digitalWrite(LEDGPIO, LOW);
	}
}

void setup() {
	wiringPiSetup();
	pinMode(LEDGPIO, OUTPUT);
	blinkAWhile();
}

int main(void) {
	int cm ;
	int input ;
 	setup();

	while(1) {
		cin >> input;
 		//cout <<  input <<   endl;
 		digitalWrite(LEDGPIO, input);
 	}

	return 0;
}

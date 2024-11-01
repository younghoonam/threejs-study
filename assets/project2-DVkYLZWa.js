import{O as ve,M as l,k as it,F as pt,l as xt,U as Pt,j as ft,m as jt,H as Zt,N as Wt,C as qt,n as Kt,o as Lt,p as be,q as we,r as xe,s as ye,t as Ae,L as _e,u as Ee,v as Se,w as Ce,x as Pe,y as Me,z as Jt,V as d,g as De,Q as M,E as te,I as yt,J as Mt,K as ee,X as x,B as v,Y as lt,Z as F,_ as Te,$ as W,a0 as Ie,a1 as Le,a2 as ie,a3 as Rt,S as Re,P as Fe,W as Ne,A as Oe,D as ke,G as $e,a4 as He,c as se}from"./GLTFLoader-B4-0SRwS.js";gsap.registerPlugin(ScrollTrigger);const Ue=gsap.utils.toArray(".fade");Ue.forEach(n=>{gsap.fromTo(n,{opacity:0,scale:.9},{opacity:1,scale:1,duration:.5,scrollTrigger:{trigger:n,start:"center 65%",end:"center 35%",toggleActions:"play reverse play reverse"}})});const Qe={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Z{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ye=new ve(-1,1,1,-1,0,1);class ze extends it{constructor(){super(),this.setAttribute("position",new pt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new pt([0,2,0,0,2,0],2))}}const Xe=new ze;class Dt{constructor(t){this._mesh=new l(Xe,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ye)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class oe extends Z{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof xt?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Pt.clone(t.uniforms),this.material=new xt({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Dt(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ft extends Z{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const o=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let s,a;this.inverse?(s=0,a=1):(s=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),r.buffers.stencil.setFunc(o.ALWAYS,s,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(o.EQUAL,1,4294967295),r.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),r.buffers.stencil.setLocked(!0)}}class Be extends Z{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Ve{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new ft);this._width=i.width,this._height=i.height,e=new jt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Zt}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oe(Qe),this.copyPass.material.blending=Wt,this.clock=new qt}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let o=0,r=this.passes.length;o<r;o++){const s=this.passes[o];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),s.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),s.needsSwap){if(i){const a=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),h.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Ft!==void 0&&(s instanceof Ft?i=!0:s instanceof Be&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ft);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(i,o),this.renderTarget2.setSize(i,o);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,o)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ge extends Z{constructor(t,e,i=null,o=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=o,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Kt}render(t,e,i){const o=t.autoClear;t.autoClear=!1;let r,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),t.autoClear=o}}const je={name:"BokehShader",defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Ze extends Z{constructor(t,e,i){super(),this.scene=t,this.camera=e;const o=i.focus!==void 0?i.focus:1,r=i.aperture!==void 0?i.aperture:.025,s=i.maxblur!==void 0?i.maxblur:1;this.renderTargetDepth=new jt(1,1,{minFilter:Lt,magFilter:Lt,type:Zt}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new be,this.materialDepth.depthPacking=we,this.materialDepth.blending=Wt;const a=je,h=Pt.clone(a.uniforms);h.tDepth.value=this.renderTargetDepth.texture,h.focus.value=o,h.aspect.value=e.aspect,h.aperture.value=r,h.maxblur.value=s,h.nearClip.value=e.near,h.farClip.value=e.far,this.materialBokeh=new xt({defines:Object.assign({},a.defines),uniforms:h,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.uniforms=h,this.fsQuad=new Dt(this.materialBokeh),this._oldClearColor=new Kt}render(t,e,i){this.scene.overrideMaterial=this.materialDepth,t.getClearColor(this._oldClearColor);const o=t.getClearAlpha(),r=t.autoClear;t.autoClear=!1,t.setClearColor(16777215),t.setClearAlpha(1),t.setRenderTarget(this.renderTargetDepth),t.clear(),t.render(this.scene,this.camera),this.uniforms.tColor.value=i.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),t.clear(),this.fsQuad.render(t)),this.scene.overrideMaterial=null,t.setClearColor(this._oldClearColor),t.setClearAlpha(o),t.autoClear=r}setSize(t,e){this.materialBokeh.uniforms.aspect.value=t/e,this.renderTargetDepth.setSize(t,e)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}const We={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class qe extends Z{constructor(){super();const t=We;this.uniforms=Pt.clone(t.uniforms),this.material=new xe({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Dt(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ye.getTransfer(this._outputColorSpace)===Ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===_e?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ee?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Se?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ce?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Pe?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Me&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Ke={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ft(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
		precision highp float;

		uniform sampler2D tDiffuse;

		uniform vec2 resolution;

		varying vec2 vUv;

		// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

		//----------------------------------------------------------------------------------
		// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
		// SDK Version: v3.00
		// Email:       gameworks@nvidia.com
		// Site:        http://developer.nvidia.com/
		//
		// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
		//
		// Redistribution and use in source and binary forms, with or without
		// modification, are permitted provided that the following conditions
		// are met:
		//  * Redistributions of source code must retain the above copyright
		//    notice, this list of conditions and the following disclaimer.
		//  * Redistributions in binary form must reproduce the above copyright
		//    notice, this list of conditions and the following disclaimer in the
		//    documentation and/or other materials provided with the distribution.
		//  * Neither the name of NVIDIA CORPORATION nor the names of its
		//    contributors may be used to endorse or promote products derived
		//    from this software without specific prior written permission.
		//
		// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
		// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
		// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
		// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
		// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
		// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
		// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
		// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
		// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
		// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
		// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		//
		//----------------------------------------------------------------------------------

		#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
		#endif

		/*--------------------------------------------------------------------------*/
		#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
		#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
		/*--------------------------------------------------------------------------*/

		#define NUM_SAMPLES 5

		// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
		float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
		}

		/*============================================================================

									FXAA3 QUALITY - PC

		============================================================================*/

		/*--------------------------------------------------------------------------*/
		vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
		) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
				if(earlyExit) FxaaDiscard;
			#else
				if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
				// locate the edge
				vec2 dirToEdge;
				dirToEdge.x = contrastE > contrastW ? 1. : -1.;
				dirToEdge.y = contrastS > contrastN ? 1. : -1.;
				// . 2 .      . 1 .
				// 1 0 2  ~=  0 0 1
				// . 1 .      . 0 .

				// tap 2 pixels and see which ones are "outside" the edge, to
				// determine if the edge is vertical or horizontal

				vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongH = contrast( rgbaM, rgbaAlongH );
				// . 1 .
				// 0 0 1
				// . 0 H

				vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
				float matchAlongV = contrast( rgbaM, rgbaAlongV );
				// V 1 .
				// 0 0 1
				// . 0 .

				relativeVContrast = matchAlongV - matchAlongH;
				relativeVContrast *= fxaaQualityinvEdgeThreshold;

				if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
					// 1 1 .
					// 0 0 1
					// . 0 1

					// do a simple blur
					return mix(
						rgbaM,
						(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
						.4
					);
				}

				horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {

				float increment = float(i + 1);

				if(!doneN) {
					nDist += increment;
					posN = posM + offNP * nDist;
					vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
					doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
					iterationsUsedN = i;
				}

				if(!doneP) {
					pDist += increment;
					posP = posM - offNP * pDist;
					vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
					doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
					iterationsUsedP = i;
				}

				if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
				doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
				doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
				rgbaM,
				rgbaN,
				dist * .5
			);
		}

		void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
				vUv,
				tDiffuse,
				resolution,
				edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
				invEdgeDetectionQuality
			);

		}
	`};/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class I{constructor(t,e,i,o,r="div"){this.parent=t,this.object=e,this.property=i,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(o),this.$name=document.createElement("div"),this.$name.classList.add("name"),I.nextNameID=I.nextNameID||0,this.$name.id="lil-gui-name-"+ ++I.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(i)}name(t){return this._name=t,this.$name.innerHTML=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled||(this._disabled=t,this.domElement.classList.toggle("disabled",t),this.$disable.toggleAttribute("disabled",t)),this}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const e=this.parent.add(this.object,this.property,t);return e.name(this._name),this.destroy(),e}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.object[this.property]=t,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Je extends I{constructor(t,e,i){super(t,e,i,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function At(n){let t,e;return(t=n.match(/(#|0x)?([a-f0-9]{6})/i))?e=t[2]:(t=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?e=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(e=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),!!e&&"#"+e}const ti={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:At,toHexString:At},st={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},ei={isPrimitive:!1,match:Array.isArray,fromHexString(n,t,e=1){const i=st.fromHexString(n);t[0]=(i>>16&255)/255*e,t[1]=(i>>8&255)/255*e,t[2]=(255&i)/255*e},toHexString:([n,t,e],i=1)=>st.toHexString(n*(i=255/i)<<16^t*i<<8^e*i<<0)},ii={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,t,e=1){const i=st.fromHexString(n);t.r=(i>>16&255)/255*e,t.g=(i>>8&255)/255*e,t.b=(255&i)/255*e},toHexString:({r:n,g:t,b:e},i=1)=>st.toHexString(n*(i=255/i)<<16^t*i<<8^e*i<<0)},si=[ti,st,ei,ii];class oi extends I{constructor(t,e,i,o){var r;super(t,e,i,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,si.find(s=>s.match(r))),this._rgbScale=o,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=At(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class vt extends I{constructor(t,e,i){super(t,e,i,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",o=>{o.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ni extends I{constructor(t,e,i,o,r,s){super(t,e,i,"number"),this._initInput(),this.min(o),this.max(r);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,e=!0){return this._step=t,this._stepExplicit=e,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1)),this.$fill.style.width=100*e+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=c=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+c),this.$input.value=this.getValue())};let e,i,o,r,s,a=!1;const h=c=>{if(a){const w=c.clientX-e,u=c.clientY-i;Math.abs(u)>5?(c.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>5&&g()}if(!a){const w=c.clientY-o;s-=w*this._step*this._arrowKeyMultiplier(c),r+s>this._max?s=this._max-r:r+s<this._min&&(s=this._min-r),this._snapClampSetValue(r+s)}o=c.clientY},g=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",h),window.removeEventListener("mouseup",g)};this.$input.addEventListener("input",()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))}),this.$input.addEventListener("keydown",c=>{c.code==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),t(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),t(this._step*this._arrowKeyMultiplier(c)*-1))}),this.$input.addEventListener("wheel",c=>{this._inputFocused&&(c.preventDefault(),t(this._step*this._normalizeMouseWheel(c)))},{passive:!1}),this.$input.addEventListener("mousedown",c=>{e=c.clientX,i=o=c.clientY,a=!0,r=this.getValue(),s=0,window.addEventListener("mousemove",h),window.addEventListener("mouseup",g)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const t=u=>{const L=this.$slider.getBoundingClientRect();let N=(S=u,A=L.left,_=L.right,E=this._min,m=this._max,(S-A)/(_-A)*(m-E)+E);var S,A,_,E,m;this._snapClampSetValue(N)},e=u=>{t(u.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",e),window.removeEventListener("mouseup",i)};let o,r,s=!1;const a=u=>{u.preventDefault(),this._setDraggingStyle(!0),t(u.touches[0].clientX),s=!1},h=u=>{if(s){const L=u.touches[0].clientX-o,N=u.touches[0].clientY-r;Math.abs(L)>Math.abs(N)?a(u):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",g))}else u.preventDefault(),t(u.touches[0].clientX)},g=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",g)},c=this._callOnFinishChange.bind(this);let w;this.$slider.addEventListener("mousedown",u=>{this._setDraggingStyle(!0),t(u.clientX),window.addEventListener("mousemove",e),window.addEventListener("mouseup",i)}),this.$slider.addEventListener("touchstart",u=>{u.touches.length>1||(this._hasScrollBar?(o=u.touches[0].clientX,r=u.touches[0].clientY,s=!0):a(u),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",g))},{passive:!1}),this.$slider.addEventListener("wheel",u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();const L=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+L),this.$input.value=this.getValue(),clearTimeout(w),w=setTimeout(c,400)},{passive:!1})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t),document.body.classList.toggle("lil-gui-dragging",t),document.body.classList.toggle("lil-gui-"+e,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(e=0,i=-t.wheelDelta/120,i*=this._stepExplicit?1:10),e+-i}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;return t.shiftKey?e*=10:t.altKey&&(e/=10),e}_snap(t){const e=Math.round(t/this._step)*this._step;return parseFloat(e.toPrecision(15))}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ri extends I{constructor(t,e,i,o){super(t,e,i,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(o)?o:Object.values(o),this._names=Array.isArray(o)?o:Object.keys(o),this._names.forEach(r=>{const s=document.createElement("option");s.innerHTML=r,this.$select.appendChild(s)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const t=this.getValue(),e=this._values.indexOf(t);return this.$select.selectedIndex=e,this.$display.innerHTML=e===-1?t:this._names[e],this}}class ai extends I{constructor(t,e,i){super(t,e,i,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",o=>{o.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}let Nt=!1;class Tt{constructor({parent:t,autoPlace:e=t===void 0,container:i,width:o,title:r="Controls",injectStyles:s=!0,touchStyles:a=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",h=>{h.code!=="Enter"&&h.code!=="Space"||(h.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!Nt&&s&&(function(h){const g=document.createElement("style");g.innerHTML=h;const c=document.querySelector("head link[rel=stylesheet], head style");c?document.head.insertBefore(g,c):document.head.appendChild(g)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),Nt=!0),i?i.appendChild(this.domElement):e&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),o&&this.domElement.style.setProperty("--width",o+"px"),this.domElement.addEventListener("keydown",h=>h.stopPropagation()),this.domElement.addEventListener("keyup",h=>h.stopPropagation())}add(t,e,i,o,r){if(Object(i)===i)return new ri(this,t,e,i);const s=t[e];switch(typeof s){case"number":return new ni(this,t,e,i,o,r);case"boolean":return new Je(this,t,e);case"string":return new ai(this,t,e);case"function":return new vt(this,t,e)}console.error(`gui.add failed
	property:`,e,`
	object:`,t,`
	value:`,s)}addColor(t,e,i=1){return new oi(this,t,e,i)}addFolder(t){return new Tt({parent:this,title:t})}load(t,e=!0){return t.controllers&&this.controllers.forEach(i=>{i instanceof vt||i._name in t.controllers&&i.load(t.controllers[i._name])}),e&&t.folders&&this.folders.forEach(i=>{i._title in t.folders&&i.load(t.folders[i._title])}),this}save(t=!0){const e={controllers:{},folders:{}};return this.controllers.forEach(i=>{if(!(i instanceof vt)){if(i._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${i._name}"`);e.controllers[i._name]=i.save()}}),t&&this.folders.forEach(i=>{if(i._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${i._title}"`);e.folders[i._title]=i.save()}),e}open(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._closed=!t,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px",this.domElement.classList.add("transition");const i=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",i))};this.$children.addEventListener("transitionend",i);const o=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t),requestAnimationFrame(()=>{this.$children.style.height=o+"px"})}),this}title(t){return this._title=t,this.$title.innerHTML=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(e=>{t=t.concat(e.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(e=>{t=t.concat(e.foldersRecursive())}),t}}const H=new Jt,b=new d,O=new d,f=new M,Ot={X:new d(1,0,0),Y:new d(0,1,0),Z:new d(0,0,1)},bt={type:"change"},kt={type:"mouseDown",mode:null},$t={type:"mouseUp",mode:null},Ht={type:"objectChange"};class li extends De{constructor(t,e=null){super(void 0,e);const i=new fi(this);this._root=i;const o=new gi;this._gizmo=o,i.add(o);const r=new mi;this._plane=r,i.add(r);const s=this;function a(m,k){let z=k;Object.defineProperty(s,m,{get:function(){return z!==void 0?z:k},set:function($){z!==$&&(z=$,r[m]=$,o[m]=$,s.dispatchEvent({type:m+"-changed",value:$}),s.dispatchEvent(bt))}}),s[m]=k,r[m]=k,o[m]=k}a("camera",t),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0);const h=new d,g=new d,c=new M,w=new M,u=new d,L=new M,N=new d,S=new d,A=new d,_=0,E=new d;a("worldPosition",h),a("worldPositionStart",g),a("worldQuaternion",c),a("worldQuaternionStart",w),a("cameraPosition",u),a("cameraQuaternion",L),a("pointStart",N),a("pointEnd",S),a("rotationAxis",A),a("rotationAngle",_),a("eye",E),this._offset=new d,this._startNorm=new d,this._endNorm=new d,this._cameraScale=new d,this._parentPosition=new d,this._parentQuaternion=new M,this._parentQuaternionInv=new M,this._parentScale=new d,this._worldScaleStart=new d,this._worldQuaternionInv=new M,this._worldScale=new d,this._positionStart=new d,this._quaternionStart=new M,this._scaleStart=new d,this._getPointer=hi.bind(this),this._onPointerDown=di.bind(this),this._onPointerHover=ci.bind(this),this._onPointerMove=ui.bind(this),this._onPointerUp=pi.bind(this),e!==null&&this.connect()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(t){if(this.object===void 0||this.dragging===!0)return;t!==null&&H.setFromCamera(t,this.camera);const e=wt(this._gizmo.picker[this.mode],H);e?this.axis=e.object.name:this.axis=null}pointerDown(t){if(!(this.object===void 0||this.dragging===!0||t!=null&&t.button!==0)&&this.axis!==null){t!==null&&H.setFromCamera(t,this.camera);const e=wt(this._plane,H,!0);e&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(e.point).sub(this.worldPositionStart)),this.dragging=!0,kt.mode=this.mode,this.dispatchEvent(kt)}}pointerMove(t){const e=this.axis,i=this.mode,o=this.object;let r=this.space;if(i==="scale"?r="local":(e==="E"||e==="XYZE"||e==="XYZ")&&(r="world"),o===void 0||e===null||this.dragging===!1||t!==null&&t.button!==-1)return;t!==null&&H.setFromCamera(t,this.camera);const s=wt(this._plane,H,!0);if(s){if(this.pointEnd.copy(s.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),r==="local"&&e!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),e.indexOf("X")===-1&&(this._offset.x=0),e.indexOf("Y")===-1&&(this._offset.y=0),e.indexOf("Z")===-1&&(this._offset.z=0),r==="local"&&e!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),o.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r==="local"&&(o.position.applyQuaternion(f.copy(this._quaternionStart).invert()),e.search("X")!==-1&&(o.position.x=Math.round(o.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(o.position.y=Math.round(o.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(o.position.z=Math.round(o.position.z/this.translationSnap)*this.translationSnap),o.position.applyQuaternion(this._quaternionStart)),r==="world"&&(o.parent&&o.position.add(b.setFromMatrixPosition(o.parent.matrixWorld)),e.search("X")!==-1&&(o.position.x=Math.round(o.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(o.position.y=Math.round(o.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(o.position.z=Math.round(o.position.z/this.translationSnap)*this.translationSnap),o.parent&&o.position.sub(b.setFromMatrixPosition(o.parent.matrixWorld))));else if(i==="scale"){if(e.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),O.set(a,a,a)}else b.copy(this.pointStart),O.copy(this.pointEnd),b.applyQuaternion(this._worldQuaternionInv),O.applyQuaternion(this._worldQuaternionInv),O.divide(b),e.search("X")===-1&&(O.x=1),e.search("Y")===-1&&(O.y=1),e.search("Z")===-1&&(O.z=1);o.scale.copy(this._scaleStart).multiply(O),this.scaleSnap&&(e.search("X")!==-1&&(o.scale.x=Math.round(o.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Y")!==-1&&(o.scale.y=Math.round(o.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Z")!==-1&&(o.scale.z=Math.round(o.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);const a=20/this.worldPosition.distanceTo(b.setFromMatrixPosition(this.camera.matrixWorld));let h=!1;e==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(b.copy(this.rotationAxis).cross(this.eye))*a):(e==="X"||e==="Y"||e==="Z")&&(this.rotationAxis.copy(Ot[e]),b.copy(Ot[e]),r==="local"&&b.applyQuaternion(this.worldQuaternion),b.cross(this.eye),b.length()===0?h=!0:this.rotationAngle=this._offset.dot(b.normalize())*a),(e==="E"||h)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r==="local"&&e!=="E"&&e!=="XYZE"?(o.quaternion.copy(this._quaternionStart),o.quaternion.multiply(f.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),o.quaternion.copy(f.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),o.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(bt),this.dispatchEvent(Ht)}}pointerUp(t){t!==null&&t.button!==0||(this.dragging&&this.axis!==null&&($t.mode=this.mode,this.dispatchEvent($t)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this.traverse(function(t){t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}attach(t){return this.object=t,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(bt),this.dispatchEvent(Ht),this.pointStart.copy(this.pointEnd))}getRaycaster(){return H}getMode(){return this.mode}setMode(t){this.mode=t}setTranslationSnap(t){this.translationSnap=t}setRotationSnap(t){this.rotationSnap=t}setScaleSnap(t){this.scaleSnap=t}setSize(t){this.size=t}setSpace(t){this.space=t}}function hi(n){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:n.button};{const t=this.domElement.getBoundingClientRect();return{x:(n.clientX-t.left)/t.width*2-1,y:-(n.clientY-t.top)/t.height*2+1,button:n.button}}}function ci(n){if(this.enabled)switch(n.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(n));break}}function di(n){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(n)),this.pointerDown(this._getPointer(n)))}function ui(n){this.enabled&&this.pointerMove(this._getPointer(n))}function pi(n){this.enabled&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(n)))}function wt(n,t,e){const i=t.intersectObject(n,!0);for(let o=0;o<i.length;o++)if(i[o].object.visible||e)return i[o];return!1}const ht=new ie,p=new d(0,1,0),Ut=new d(0,0,0),Qt=new te,ct=new M,ut=new M,D=new d,Yt=new te,tt=new d(1,0,0),U=new d(0,1,0),et=new d(0,0,1),dt=new d,q=new d,K=new d;class fi extends yt{constructor(t){super(),this.isTransformControlsRoot=!0,this.controls=t,this.visible=!1}updateMatrixWorld(t){const e=this.controls;e.object!==void 0&&(e.object.updateMatrixWorld(),e.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):e.object.parent.matrixWorld.decompose(e._parentPosition,e._parentQuaternion,e._parentScale),e.object.matrixWorld.decompose(e.worldPosition,e.worldQuaternion,e._worldScale),e._parentQuaternionInv.copy(e._parentQuaternion).invert(),e._worldQuaternionInv.copy(e.worldQuaternion).invert()),e.camera.updateMatrixWorld(),e.camera.matrixWorld.decompose(e.cameraPosition,e.cameraQuaternion,e._cameraScale),e.camera.isOrthographicCamera?e.camera.getWorldDirection(e.eye).negate():e.eye.copy(e.cameraPosition).sub(e.worldPosition).normalize(),super.updateMatrixWorld(t)}}class gi extends yt{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";const t=new Mt({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),e=new ee({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=t.clone();i.opacity=.15;const o=e.clone();o.opacity=.5;const r=t.clone();r.color.setHex(16711680);const s=t.clone();s.color.setHex(65280);const a=t.clone();a.color.setHex(255);const h=t.clone();h.color.setHex(16711680),h.opacity=.5;const g=t.clone();g.color.setHex(65280),g.opacity=.5;const c=t.clone();c.color.setHex(255),c.opacity=.5;const w=t.clone();w.opacity=.25;const u=t.clone();u.color.setHex(16776960),u.opacity=.25,t.clone().color.setHex(16776960);const N=t.clone();N.color.setHex(7895160);const S=new x(0,.04,.1,12);S.translate(0,.05,0);const A=new v(.08,.08,.08);A.translate(0,.04,0);const _=new it;_.setAttribute("position",new pt([0,0,0,1,0,0],3));const E=new x(.0075,.0075,.5,3);E.translate(0,.25,0);function m(C,ot){const P=new W(C,.0075,3,64,ot*Math.PI*2);return P.rotateY(Math.PI/2),P.rotateX(Math.PI/2),P}function k(){const C=new it;return C.setAttribute("position",new pt([0,0,0,1,1,1],3)),C}const z={X:[[new l(S,r),[.5,0,0],[0,0,-Math.PI/2]],[new l(S,r),[-.5,0,0],[0,0,Math.PI/2]],[new l(E,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new l(S,s),[0,.5,0]],[new l(S,s),[0,-.5,0],[Math.PI,0,0]],[new l(E,s)]],Z:[[new l(S,a),[0,0,.5],[Math.PI/2,0,0]],[new l(S,a),[0,0,-.5],[-Math.PI/2,0,0]],[new l(E,a),null,[Math.PI/2,0,0]]],XYZ:[[new l(new lt(.1,0),w.clone()),[0,0,0]]],XY:[[new l(new v(.15,.15,.01),c.clone()),[.15,.15,0]]],YZ:[[new l(new v(.15,.15,.01),h.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new l(new v(.15,.15,.01),g.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},$={X:[[new l(new x(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new l(new x(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new l(new x(.2,0,.6,4),i),[0,.3,0]],[new l(new x(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new l(new x(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new l(new x(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new l(new lt(.2,0),i)]],XY:[[new l(new v(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new l(new v(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new l(new v(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},he={START:[[new l(new lt(.01,2),o),null,null,null,"helper"]],END:[[new l(new lt(.01,2),o),null,null,null,"helper"]],DELTA:[[new F(k(),o),null,null,null,"helper"]],X:[[new F(_,o.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new F(_,o.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new F(_,o.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},ce={XYZE:[[new l(m(.5,1),N),null,[0,Math.PI/2,0]]],X:[[new l(m(.5,.5),r)]],Y:[[new l(m(.5,.5),s),null,[0,0,-Math.PI/2]]],Z:[[new l(m(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new l(m(.75,1),u),null,[0,Math.PI/2,0]]]},de={AXIS:[[new F(_,o.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},ue={XYZE:[[new l(new Te(.25,10,8),i)]],X:[[new l(new W(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new l(new W(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new l(new W(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new l(new W(.75,.1,2,24),i)]]},pe={X:[[new l(A,r),[.5,0,0],[0,0,-Math.PI/2]],[new l(E,r),[0,0,0],[0,0,-Math.PI/2]],[new l(A,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new l(A,s),[0,.5,0]],[new l(E,s)],[new l(A,s),[0,-.5,0],[0,0,Math.PI]]],Z:[[new l(A,a),[0,0,.5],[Math.PI/2,0,0]],[new l(E,a),[0,0,0],[Math.PI/2,0,0]],[new l(A,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new l(new v(.15,.15,.01),c),[.15,.15,0]]],YZ:[[new l(new v(.15,.15,.01),h),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new l(new v(.15,.15,.01),g),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new l(new v(.1,.1,.1),w.clone())]]},fe={X:[[new l(new x(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new l(new x(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new l(new x(.2,0,.6,4),i),[0,.3,0]],[new l(new x(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new l(new x(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new l(new x(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new l(new v(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new l(new v(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new l(new v(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new l(new v(.2,.2,.2),i),[0,0,0]]]},ge={X:[[new F(_,o.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new F(_,o.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new F(_,o.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function R(C){const ot=new yt;for(const P in C)for(let X=C[P].length;X--;){const y=C[P][X][0].clone(),nt=C[P][X][1],rt=C[P][X][2],at=C[P][X][3],me=C[P][X][4];y.name=P,y.tag=me,nt&&y.position.set(nt[0],nt[1],nt[2]),rt&&y.rotation.set(rt[0],rt[1],rt[2]),at&&y.scale.set(at[0],at[1],at[2]),y.updateMatrix();const It=y.geometry.clone();It.applyMatrix4(y.matrix),y.geometry=It,y.renderOrder=1/0,y.position.set(0,0,0),y.rotation.set(0,0,0),y.scale.set(1,1,1),ot.add(y)}return ot}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=R(z)),this.add(this.gizmo.rotate=R(ce)),this.add(this.gizmo.scale=R(pe)),this.add(this.picker.translate=R($)),this.add(this.picker.rotate=R(ue)),this.add(this.picker.scale=R(fe)),this.add(this.helper.translate=R(he)),this.add(this.helper.rotate=R(de)),this.add(this.helper.scale=R(ge)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(t){const i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:ut;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let o=[];o=o.concat(this.picker[this.mode].children),o=o.concat(this.gizmo[this.mode].children),o=o.concat(this.helper[this.mode].children);for(let r=0;r<o.length;r++){const s=o[r];s.visible=!0,s.rotation.set(0,0,0),s.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),s.scale.set(1,1,1).multiplyScalar(a*this.size/4),s.tag==="helper"){s.visible=!1,s.name==="AXIS"?(s.visible=!!this.axis,this.axis==="X"&&(f.setFromEuler(ht.set(0,0,0)),s.quaternion.copy(i).multiply(f),Math.abs(p.copy(tt).applyQuaternion(i).dot(this.eye))>.9&&(s.visible=!1)),this.axis==="Y"&&(f.setFromEuler(ht.set(0,0,Math.PI/2)),s.quaternion.copy(i).multiply(f),Math.abs(p.copy(U).applyQuaternion(i).dot(this.eye))>.9&&(s.visible=!1)),this.axis==="Z"&&(f.setFromEuler(ht.set(0,Math.PI/2,0)),s.quaternion.copy(i).multiply(f),Math.abs(p.copy(et).applyQuaternion(i).dot(this.eye))>.9&&(s.visible=!1)),this.axis==="XYZE"&&(f.setFromEuler(ht.set(0,Math.PI/2,0)),p.copy(this.rotationAxis),s.quaternion.setFromRotationMatrix(Qt.lookAt(Ut,p,U)),s.quaternion.multiply(f),s.visible=this.dragging),this.axis==="E"&&(s.visible=!1)):s.name==="START"?(s.position.copy(this.worldPositionStart),s.visible=this.dragging):s.name==="END"?(s.position.copy(this.worldPosition),s.visible=this.dragging):s.name==="DELTA"?(s.position.copy(this.worldPositionStart),s.quaternion.copy(this.worldQuaternionStart),b.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),b.applyQuaternion(this.worldQuaternionStart.clone().invert()),s.scale.copy(b),s.visible=this.dragging):(s.quaternion.copy(i),this.dragging?s.position.copy(this.worldPositionStart):s.position.copy(this.worldPosition),this.axis&&(s.visible=this.axis.search(s.name)!==-1));continue}s.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(s.name==="X"&&Math.abs(p.copy(tt).applyQuaternion(i).dot(this.eye))>.99&&(s.scale.set(1e-10,1e-10,1e-10),s.visible=!1),s.name==="Y"&&Math.abs(p.copy(U).applyQuaternion(i).dot(this.eye))>.99&&(s.scale.set(1e-10,1e-10,1e-10),s.visible=!1),s.name==="Z"&&Math.abs(p.copy(et).applyQuaternion(i).dot(this.eye))>.99&&(s.scale.set(1e-10,1e-10,1e-10),s.visible=!1),s.name==="XY"&&Math.abs(p.copy(et).applyQuaternion(i).dot(this.eye))<.2&&(s.scale.set(1e-10,1e-10,1e-10),s.visible=!1),s.name==="YZ"&&Math.abs(p.copy(tt).applyQuaternion(i).dot(this.eye))<.2&&(s.scale.set(1e-10,1e-10,1e-10),s.visible=!1),s.name==="XZ"&&Math.abs(p.copy(U).applyQuaternion(i).dot(this.eye))<.2&&(s.scale.set(1e-10,1e-10,1e-10),s.visible=!1)):this.mode==="rotate"&&(ct.copy(i),p.copy(this.eye).applyQuaternion(f.copy(i).invert()),s.name.search("E")!==-1&&s.quaternion.setFromRotationMatrix(Qt.lookAt(this.eye,Ut,U)),s.name==="X"&&(f.setFromAxisAngle(tt,Math.atan2(-p.y,p.z)),f.multiplyQuaternions(ct,f),s.quaternion.copy(f)),s.name==="Y"&&(f.setFromAxisAngle(U,Math.atan2(p.x,p.z)),f.multiplyQuaternions(ct,f),s.quaternion.copy(f)),s.name==="Z"&&(f.setFromAxisAngle(et,Math.atan2(p.y,p.x)),f.multiplyQuaternions(ct,f),s.quaternion.copy(f))),s.visible=s.visible&&(s.name.indexOf("X")===-1||this.showX),s.visible=s.visible&&(s.name.indexOf("Y")===-1||this.showY),s.visible=s.visible&&(s.name.indexOf("Z")===-1||this.showZ),s.visible=s.visible&&(s.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),s.material._color=s.material._color||s.material.color.clone(),s.material._opacity=s.material._opacity||s.material.opacity,s.material.color.copy(s.material._color),s.material.opacity=s.material._opacity,this.enabled&&this.axis&&(s.name===this.axis||this.axis.split("").some(function(h){return s.name===h}))&&(s.material.color.setHex(16776960),s.material.opacity=1)}super.updateMatrixWorld(t)}}class mi extends l{constructor(){super(new Ie(1e5,1e5,2,2),new Mt({visible:!1,wireframe:!0,side:Le,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(t){let e=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(e="local"),dt.copy(tt).applyQuaternion(e==="local"?this.worldQuaternion:ut),q.copy(U).applyQuaternion(e==="local"?this.worldQuaternion:ut),K.copy(et).applyQuaternion(e==="local"?this.worldQuaternion:ut),p.copy(q),this.mode){case"translate":case"scale":switch(this.axis){case"X":p.copy(this.eye).cross(dt),D.copy(dt).cross(p);break;case"Y":p.copy(this.eye).cross(q),D.copy(q).cross(p);break;case"Z":p.copy(this.eye).cross(K),D.copy(K).cross(p);break;case"XY":D.copy(K);break;case"YZ":D.copy(dt);break;case"XZ":p.copy(K),D.copy(q);break;case"XYZ":case"E":D.set(0,0,0);break}break;case"rotate":default:D.set(0,0,0)}D.length()===0?this.quaternion.copy(this.cameraQuaternion):(Yt.lookAt(b.set(0,0,0),D,p),this.quaternion.setFromRotationMatrix(Yt)),super.updateMatrixWorld(t)}}function _t(n){const t=window.scrollY,e=document.documentElement.scrollHeight,i=window.innerHeight,o=e-i;return t/o}function B(n,t){return Math.random()*(t-n)+n}const zt=1,Xt=0;class vi{constructor(t,e,i,o,r,s){this.model=t,this.camera=o,this.canvas=r,this.scene=s,this.curveHandles=[],this.lerpValue=.1,this.action=Xt,this.initCurves(e,i),this.positionLine=this.createPositionLine(),this.initRaycaster(),this.addScrollListener(),this.updateTargetTransform(_t())}initCurves(t,e){this.createHandles(t),this.positionSpline=new Rt(this.curveHandles.map(i=>i.position)),this.rotationSpline=new Rt(e.map(i=>new d(i.x,i.y,i.z))),this.targetPosition=new d,this.targetQuaternion=new M,this.targetRotation=new ie}createHandles(t){t.forEach(e=>{const i=new l(new v(.1,.1,.1),new Mt({color:6710886}));i.position.copy(e),this.curveHandles.push(i)})}createPositionLine(){const e=this.positionSpline.getPoints(50);return new F(new it().setFromPoints(e),new ee({color:3355647}))}initRaycaster(){this.mouse=new ft,this.rayCaster=new Jt,this.control=new li(this.camera,this.canvas),this.control.addEventListener("dragging-changed",t=>{t.value||this.updateLineGeometry()}),window.addEventListener("mousedown",this.handleMouseDown.bind(this))}updateLineGeometry(){const t=this.positionSpline.getPoints(50);this.positionLine.geometry.setFromPoints(t)}handleMouseDown(t){this.action=zt,this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1}updateTransformControls(){if(this.action===zt){this.rayCaster.setFromCamera(this.mouse,this.camera),this.action=Xt;const t=this.rayCaster.intersectObjects(this.curveHandles,!1);if(t.length){const e=t[0].object;this.control.attach(e),this.scene.add(this.control.getHelper())}}}updateTargetTransform(t){this.targetPosition.copy(this.positionSpline.getPointAt(t)),this.targetRotation.setFromVector3(this.rotationSpline.getPointAt(t)),this.targetQuaternion.setFromEuler(this.targetRotation)}updateModelTransform(){this.model.position.lerp(this.targetPosition,this.lerpValue),this.model.quaternion.slerp(this.targetQuaternion,this.lerpValue)}addHandlesToScene(){this.curveHandles.forEach(t=>this.scene.add(t)),this.scene.add(this.positionLine)}removeHandlesFromScene(){this.curveHandles.forEach(t=>this.scene.remove(t)),this.scene.remove(this.positionLine),this.scene.remove(this.control.getHelper())}addScrollListener(){window.addEventListener("scroll",()=>{this.updateTargetTransform(_t())})}update(){this.updateModelTransform(),this.updateTransformControls()}getPositionPoints(){return this.positionSpline.points}}class bi{constructor(t){this.geometry=t,this.initialGeometry=new it().copy(this.geometry),this.maxDistance=this.initialGeometry.boundingBox.max.x,this.waveLength=.0012,this.waveAmplitude=.00125,this.waveSpeed=5}morph(t){const e=this.geometry.getAttribute("position"),i=this.initialGeometry.getAttribute("position"),o=t.getElapsedTime();for(let r=0;r<e.count;r++){const s=e.getX(r),a=e.getZ(r),h=Math.hypot(s,a),g=(this.maxDistance-h)/this.maxDistance,c=Math.sin(s*(1/this.waveLength)+o*this.waveSpeed)*this.waveAmplitude*g;e.setY(r,i.getY(r)+c)}this.geometry.computeVertexNormals(),e.needsUpdate=!0}}const Bt=.001,wi=.001,gt=-.01,Et=.05,xi=10,mt=-100,St=-mt;let Q=gt,J,Vt,V,Ct;const ne=[],re={},yi=new qt,T=document.querySelector("#canvas"),Y=new Re,G=new Fe(30,T.clientWidth/T.clientHeight,.1,1e3);G.position.z=5;const j=new Ne({canvas:T,antialias:!0});j.setClearColor(14800602);j.setSize(T.clientWidth,T.clientHeight,!1);j.setAnimationLoop(Mi);Ai();function Ai(){const n=new Oe("white",.5);Y.add(n),[{color:"white",intensity:3,position:[0,1,.5]},{color:"pink",intensity:.5,position:[0,-1,0]},{color:"salmon",intensity:.7,position:[1,0,-1]},{color:"slateblue",intensity:.3,position:[-1,-.5,.5]}].forEach(({color:e,intensity:i,position:o})=>{const r=new ke(e,i);r.position.set(...o),Y.add(r)})}_i();function _i(){const n=new Ve(j);n.addPass(new Ge(Y,G)),n.addPass(new Ze(Y,G,{focus:5,aperture:1e-4,maxblur:.01})),n.addPass(new qe),n.addPass(new oe(Ke)),re.composer=n}Ei();async function Ei(){const[n,t]=await Promise.all([Si(),Ci()]);J=n.scene,J.scale.multiplyScalar(25),Vt=J.children.find(e=>e.name=="top"),Ct=new bi(Vt.geometry),Y.add(J),V=new vi(J,t.positionPoints,t.quaternionPoints,G,T,Y)}async function Si(){return await new $e().loadAsync("disc.glb")}async function Ci(){return await(await fetch("config.json")).json()}Pi();function Pi(){const n=new He({color:16626333,transparent:!0,opacity:.3,clearcoat:1,roughness:0,reflectivity:1,ior:2.333,iridescence:1});for(let t=0;t<xi;t++){const e=new x(15,15,3,32),i=new l(e,n);i.position.set(B(-50,50),B(mt,St),B(-100,-150)),i.rotation.set(B(0,Math.PI*2),B(0,Math.PI*2),B(0,Math.PI*2)),Y.add(i),ne.push(i)}}function Mi(){V&&Ct&&(V.update(),Ct.morph(yi)),Di(),re.composer.render()}function Di(){ne.forEach(n=>{n.position.y+=Q,n.position.y<mt&&(n.position.y=St),n.position.y>St&&(n.position.y=mt),n.rotation.x+=Bt,n.rotation.y+=Bt}),Q=se.clamp(Q+Math.sign(gt-Q)*wi,gt,Et)}window.addEventListener("resize",()=>{G.aspect=T.clientWidth/T.clientHeight,G.updateProjectionMatrix(),j.setSize(T.clientWidth,T.clientHeight,!1),j.setPixelRatio(Math.min(window.devicePixelRatio,2))});let Gt=0;window.addEventListener("scroll",Ti);function Ti(){const n=_t(),t=Math.sign(n-Gt);Q+=t*gt,Q=se.clamp(Q,-Et,Et),Gt=n}const ae=new Tt,le={logPositionPoints:()=>console.log(V.positionSpline.points),showTransformControls:!1};ae.add(le,"logPositionPoints");ae.add(le,"showTransformControls").onChange(n=>{n?V.addHandlesToScene():V.removeHandlesFromScene()});
